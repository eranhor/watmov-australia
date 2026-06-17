"""Watmov PDF Library Downloader.

Downloads all PDFs from info@watmov.com.au Gmail and Google Drive,
deduplicates by filename (keeping the latest), and saves them locally.
"""

from __future__ import annotations

import base64
import os
from dataclasses import dataclass, field
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

# Scopes needed for Gmail and Drive
SCOPES: list[str] = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
]


@dataclass
class PdfFile:
    """Represents a downloaded PDF file."""

    filename: str
    source: str
    date: str
    path: Path


@dataclass
class DownloadResult:
    """Result of the download operation."""

    gmail_count: int = 0
    drive_count: int = 0
    unique_count: int = 0
    duplicates_removed: int = 0
    errors: list[str] = field(default_factory=list)


def get_credentials() -> Credentials:
    """Authenticate with Google APIs using OAuth2.

    Returns:
        Valid Google OAuth2 credentials.

    Raises:
        FileNotFoundError: If credentials.json is not found.
    """
    creds: Credentials | None = None
    token_path = Path("token.json")

    # Load existing token
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    # If no valid credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            credentials_file = Path("credentials.json")
            if not credentials_file.exists():
                raise FileNotFoundError(
                    "credentials.json not found. Please download it from Google Cloud Console."
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                str(credentials_file), SCOPES
            )
            creds = flow.run_local_server(port=0)

        # Save token for future runs
        with token_path.open("w") as token:
            token.write(creds.to_json())

    return creds


def get_gmail_service() -> Any:
    """Get Gmail API service."""
    creds = get_credentials()
    return build("gmail", "v1", credentials=creds)


def get_drive_service() -> Any:
    """Get Drive API service."""
    creds = get_credentials()
    return build("drive", "v3", credentials=creds)


def parse_date(date_str: str) -> datetime:
    """Parse various date formats to datetime.

    Args:
        date_str: Date string in various formats.

    Returns:
        Parsed datetime or datetime.min if parsing fails.
    """
    if not date_str:
        return datetime.min

    try:
        # Try RFC 2822 format (Gmail)
        return parsedate_to_datetime(date_str)
    except (TypeError, ValueError):
        try:
            # Try ISO format (Drive)
            return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except (TypeError, ValueError):
            return datetime.min


def download_gmail_pdfs(service: Any, output_dir: Path) -> list[PdfFile]:
    """Download all PDF attachments from Gmail.

    Args:
        service: Gmail API service.
        output_dir: Directory to save downloaded files.

    Returns:
        List of downloaded PDF files.
    """
    downloaded: list[PdfFile] = []
    page_token: str | None = None

    print("Scanning Gmail for PDFs...")

    try:
        while True:
            # Search for messages with PDF attachments
            results = (
                service.users()
                .messages()
                .list(userId="me", q="has:attachment filename:pdf", pageToken=page_token)
                .execute()
            )

            messages = results.get("messages", [])

            for msg_meta in messages:
                try:
                    msg = (
                        service.users()
                        .messages()
                        .get(userId="me", id=msg_meta["id"])
                        .execute()
                    )

                    # Get message date
                    headers = msg["payload"]["headers"]
                    date_str = next(
                        (h["value"] for h in headers if h["name"] == "Date"), ""
                    )

                    # Process attachments
                    parts = msg["payload"].get("parts", [])
                    for part in parts:
                        filename = part.get("filename", "")
                        if filename and filename.lower().endswith(".pdf"):
                            attachment_id = part["body"].get("attachmentId")

                            if attachment_id:
                                attachment = (
                                    service.users()
                                    .messages()
                                    .attachments()
                                    .get(
                                        userId="me",
                                        messageId=msg_meta["id"],
                                        id=attachment_id,
                                    )
                                    .execute()
                                )

                                file_data = base64.urlsafe_b64decode(
                                    attachment["data"]
                                )

                                # Save file
                                filepath = output_dir / filename
                                with filepath.open("wb") as f:
                                    f.write(file_data)

                                downloaded.append(
                                    PdfFile(
                                        filename=filename,
                                        source="gmail",
                                        date=date_str,
                                        path=filepath,
                                    )
                                )

                                print(f"  Downloaded from Gmail: {filename}")
                except HttpError as e:
                    print(f"  Error processing Gmail message: {e}")
                    continue

            page_token = results.get("nextPageToken")
            if not page_token:
                break
    except HttpError as e:
        print(f"Error accessing Gmail: {e}")

    print(f"Gmail: Downloaded {len(downloaded)} PDFs")
    return downloaded


def download_drive_pdfs(service: Any, output_dir: Path) -> list[PdfFile]:
    """Download all PDFs from Google Drive.

    Args:
        service: Drive API service.
        output_dir: Directory to save downloaded files.

    Returns:
        List of downloaded PDF files.
    """
    downloaded: list[PdfFile] = []
    page_token: str | None = None

    print("Scanning Google Drive for PDFs...")

    try:
        while True:
            results = (
                service.files()
                .list(
                    q="mimeType='application/pdf' and trashed=false",
                    spaces="drive",
                    fields="nextPageToken, files(id, name, modifiedTime)",
                    pageToken=page_token,
                    pageSize=100,
                )
                .execute()
            )

            files = results.get("files", [])

            for file in files:
                try:
                    filename = file["name"]
                    file_id = file["id"]
                    modified_time = file["modifiedTime"]

                    # Download file
                    request = service.files().get_media(fileId=file_id)
                    filepath = output_dir / filename

                    with filepath.open("wb") as f:
                        downloader = MediaIoBaseDownload(f, request)
                        done = False
                        while not done:
                            status, done = downloader.next_chunk()

                    downloaded.append(
                        PdfFile(
                            filename=filename,
                            source="drive",
                            date=modified_time,
                            path=filepath,
                        )
                    )

                    print(f"  Downloaded from Drive: {filename}")
                except HttpError as e:
                    print(f"  Error downloading from Drive: {e}")
                    continue

            page_token = results.get("nextPageToken")
            if not page_token:
                break
    except HttpError as e:
        print(f"Error accessing Drive: {e}")

    print(f"Drive: Downloaded {len(downloaded)} PDFs")
    return downloaded


def deduplicate_files(files: list[PdfFile]) -> tuple[list[PdfFile], list[PdfFile]]:
    """Deduplicate by filename, keeping the latest version.

    Args:
        files: List of downloaded PDF files.

    Returns:
        Tuple of (kept files, removed files).
    """
    print("\nDeduplicating files...")

    # Group by filename
    by_name: dict[str, list[PdfFile]] = {}
    for file in files:
        name = file.filename
        if name not in by_name:
            by_name[name] = []
        by_name[name].append(file)

    # Keep latest for each filename
    kept: list[PdfFile] = []
    removed: list[PdfFile] = []

    for name, versions in by_name.items():
        # Sort by date (latest first)
        versions.sort(key=lambda x: parse_date(x.date), reverse=True)

        # Keep the latest
        kept.append(versions[0])

        # Remove older versions
        for old in versions[1:]:
            removed.append(old)
            if old.path.exists():
                old.path.unlink()
                print(f"  Removed duplicate: {old.filename} ({old.source})")

    print(f"Kept {len(kept)} unique files, removed {len(removed)} duplicates")
    return kept, removed


def main() -> DownloadResult:
    """Main execution function.

    Returns:
        Result of the download operation.
    """
    output_dir = Path("/Users/eran/OpenCode/Watmov/pdf-library")
    result = DownloadResult()

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("Watmov PDF Library Downloader")
    print("=" * 60)

    try:
        # Get services
        print("\nAuthenticating with Google...")
        gmail_service = get_gmail_service()
        drive_service = get_drive_service()
        print("Authentication successful!")

        # Download from Gmail
        gmail_files = download_gmail_pdfs(gmail_service, output_dir)
        result.gmail_count = len(gmail_files)

        # Download from Drive
        drive_files = download_drive_pdfs(drive_service, output_dir)
        result.drive_count = len(drive_files)

        # Combine all files
        all_files = gmail_files + drive_files
        print(f"\nTotal downloaded: {len(all_files)} files")

        # Deduplicate
        if len(all_files) > 0:
            kept, removed = deduplicate_files(all_files)
            result.unique_count = len(kept)
            result.duplicates_removed = len(removed)

            print("\n" + "=" * 60)
            print("SUMMARY")
            print("=" * 60)
            print(f"Gmail PDFs: {result.gmail_count}")
            print(f"Drive PDFs: {result.drive_count}")
            print(f"Total unique files: {result.unique_count}")
            print(f"Duplicates removed: {result.duplicates_removed}")
            print(f"\nOutput directory: {output_dir}")
        else:
            print("\nNo PDFs found.")
    except Exception as e:
        result.errors.append(str(e))
        print(f"\nError: {e}")

    return result


if __name__ == "__main__":
    main()
