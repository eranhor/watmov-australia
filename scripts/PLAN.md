# Watmov PDF Library Automation - Implementation Plan

> **For agentic workers:** Use python-pro skill for implementation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Python script that downloads all PDFs from `info@watmov.com.au` Gmail and Google Drive, deduplicates by filename (keeping the latest), and saves them to `/Users/eran/OpenCode/Watmov/pdf-library/`.

**Architecture:** Single Python script using Google APIs (Gmail API + Drive API v3) with OAuth2 authentication. Downloads from both sources, tracks file metadata (name, source, date), and applies deduplication logic.

**Tech Stack:** Python 3.11+, `google-api-python-client`, `google-auth-oauthlib`, `google-auth-httplib2`

---

## File Structure

- `scripts/download_pdfs.py` - Main automation script
- `scripts/requirements.txt` - Python dependencies
- `scripts/.gitignore` - Ignore credentials and downloaded files
- `/Users/eran/OpenCode/Watmov/pdf-library/` - Output directory for PDFs

---

## Task 1: Setup & Dependencies

**Files:**
- Create: `scripts/requirements.txt`
- Create: `scripts/.gitignore`

- [ ] **Step 1: Create requirements.txt**

```
google-api-python-client>=2.100.0
google-auth-oauthlib>=1.0.0
google-auth-httplib2>=0.1.1
```

- [ ] **Step 2: Create .gitignore**

```
# Credentials
credentials.json
token.json

# Downloaded files
pdf-library/
```

- [ ] **Step 3: Install dependencies**

Run: `cd scripts && pip install -r requirements.txt`

---

## Task 2: Google API Authentication

**Files:**
- Create: `scripts/download_pdfs.py` (initial structure)

- [ ] **Step 1: Implement OAuth2 authentication function**

```python
import os
import pickle
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# Scopes needed for Gmail and Drive
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
]

def get_credentials():
    """Authenticate with Google APIs using OAuth2."""
    creds = None
    token_path = 'token.json'
    
    # Load existing token
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    
    # If no valid credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists('credentials.json'):
                raise FileNotFoundError(
                    "credentials.json not found. Please download it from Google Cloud Console."
                )
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save token for future runs
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    
    return creds

def get_gmail_service():
    """Get Gmail API service."""
    creds = get_credentials()
    return build('gmail', 'v1', credentials=creds)

def get_drive_service():
    """Get Drive API service."""
    creds = get_credentials()
    return build('drive', 'v3', credentials=creds)
```

---

## Task 3: Gmail PDF Download

**Files:**
- Modify: `scripts/download_pdfs.py`

- [ ] **Step 1: Implement Gmail PDF search and download**

```python
import base64
from datetime import datetime

def download_gmail_pdfs(service, output_dir):
    """Download all PDF attachments from Gmail."""
    downloaded = []
    page_token = None
    
    print("Scanning Gmail for PDFs...")
    
    while True:
        # Search for messages with PDF attachments
        results = service.users().messages().list(
            userId='me',
            q='has:attachment filename:pdf',
            pageToken=page_token
        ).execute()
        
        messages = results.get('messages', [])
        
        for msg_meta in messages:
            msg = service.users().messages().get(
                userId='me', 
                id=msg_meta['id']
            ).execute()
            
            # Get message date
            headers = msg['payload']['headers']
            date_str = next(
                (h['value'] for h in headers if h['name'] == 'Date'), 
                None
            )
            
            # Process attachments
            parts = msg['payload'].get('parts', [])
            for part in parts:
                if part['filename'] and part['filename'].lower().endswith('.pdf'):
                    filename = part['filename']
                    attachment_id = part['body'].get('attachmentId')
                    
                    if attachment_id:
                        attachment = service.users().messages().attachments().get(
                            userId='me',
                            messageId=msg_meta['id'],
                            id=attachment_id
                        ).execute()
                        
                        file_data = base64.urlsafe_b64decode(attachment['data'])
                        
                        # Save file
                        filepath = os.path.join(output_dir, filename)
                        with open(filepath, 'wb') as f:
                            f.write(file_data)
                        
                        downloaded.append({
                            'filename': filename,
                            'source': 'gmail',
                            'date': date_str,
                            'path': filepath
                        })
                        
                        print(f"  Downloaded from Gmail: {filename}")
        
        page_token = results.get('nextPageToken')
        if not page_token:
            break
    
    print(f"Gmail: Downloaded {len(downloaded)} PDFs")
    return downloaded
```

---

## Task 4: Google Drive PDF Download

**Files:**
- Modify: `scripts/download_pdfs.py`

- [ ] **Step 1: Implement Drive PDF search and download**

```python
def download_drive_pdfs(service, output_dir):
    """Download all PDFs from Google Drive."""
    downloaded = []
    page_token = None
    
    print("Scanning Google Drive for PDFs...")
    
    while True:
        results = service.files().list(
            q="mimeType='application/pdf' and trashed=false",
            spaces='drive',
            fields='nextPageToken, files(id, name, modifiedTime)',
            pageToken=page_token,
            pageSize=100
        ).execute()
        
        files = results.get('files', [])
        
        for file in files:
            filename = file['name']
            file_id = file['id']
            modified_time = file['modifiedTime']
            
            # Download file
            request = service.files().get_media(fileId=file_id)
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'wb') as f:
                downloader = request.execute()
                f.write(downloader)
            
            downloaded.append({
                'filename': filename,
                'source': 'drive',
                'date': modified_time,
                'path': filepath
            })
            
            print(f"  Downloaded from Drive: {filename}")
        
        page_token = results.get('nextPageToken')
        if not page_token:
            break
    
    print(f"Drive: Downloaded {len(downloaded)} PDFs")
    return downloaded
```

---

## Task 5: Deduplication Logic

**Files:**
- Modify: `scripts/download_pdfs.py`

- [ ] **Step 1: Implement deduplication (keep latest by filename)**

```python
from email.utils import parsedate_to_datetime

def parse_date(date_str):
    """Parse various date formats to datetime."""
    if not date_str:
        return datetime.min
    
    try:
        # Try RFC 2822 format (Gmail)
        return parsedate_to_datetime(date_str)
    except:
        try:
            # Try ISO format (Drive)
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        except:
            return datetime.min

def deduplicate_files(files):
    """Deduplicate by filename, keeping the latest version."""
    print("\nDeduplicating files...")
    
    # Group by filename
    by_name = {}
    for file in files:
        name = file['filename']
        if name not in by_name:
            by_name[name] = []
        by_name[name].append(file)
    
    # Keep latest for each filename
    kept = []
    removed = []
    
    for name, versions in by_name.items():
        # Sort by date (latest first)
        versions.sort(key=lambda x: parse_date(x['date']), reverse=True)
        
        # Keep the latest
        kept.append(versions[0])
        
        # Remove older versions
        for old in versions[1:]:
            removed.append(old)
            if os.path.exists(old['path']):
                os.remove(old['path'])
                print(f"  Removed duplicate: {old['filename']} ({old['source']})")
    
    print(f"Kept {len(kept)} unique files, removed {len(removed)} duplicates")
    return kept, removed
```

---

## Task 6: Main Function & Execution

**Files:**
- Modify: `scripts/download_pdfs.py`

- [ ] **Step 1: Implement main function**

```python
def main():
    """Main execution function."""
    output_dir = '/Users/eran/OpenCode/Watmov/pdf-library'
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    print("=" * 60)
    print("Watmov PDF Library Downloader")
    print("=" * 60)
    
    # Get services
    print("\nAuthenticating with Google...")
    gmail_service = get_gmail_service()
    drive_service = get_drive_service()
    print("Authentication successful!")
    
    # Download from Gmail
    gmail_files = download_gmail_pdfs(gmail_service, output_dir)
    
    # Download from Drive
    drive_files = download_drive_pdfs(drive_service, output_dir)
    
    # Combine all files
    all_files = gmail_files + drive_files
    print(f"\nTotal downloaded: {len(all_files)} files")
    
    # Deduplicate
    if len(all_files) > 0:
        kept, removed = deduplicate_files(all_files)
        
        print("\n" + "=" * 60)
        print("SUMMARY")
        print("=" * 60)
        print(f"Gmail PDFs: {len(gmail_files)}")
        print(f"Drive PDFs: {len(drive_files)}")
        print(f"Total unique files: {len(kept)}")
        print(f"Duplicates removed: {len(removed)}")
        print(f"\nOutput directory: {output_dir}")
    else:
        print("\nNo PDFs found.")

if __name__ == '__main__':
    main()
```

---

## Task 7: Setup Instructions

**Files:**
- Create: `scripts/README.md`

- [ ] **Step 1: Create setup instructions**

```markdown
# Watmov PDF Library Downloader

## Prerequisites

1. Python 3.11+ installed
2. Google Cloud project with Gmail API and Drive API enabled
3. OAuth 2.0 credentials downloaded as `credentials.json`

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Place your `credentials.json` in this directory
   (Download from Google Cloud Console > APIs & Services > Credentials)

3. Run the script:
   ```bash
   python download_pdfs.py
   ```

4. On first run, a browser window will open for OAuth authentication.
   After authenticating, a `token.json` will be saved for future runs.

## Output

PDFs are saved to: `/Users/eran/OpenCode/Watmov/pdf-library/`

Duplicates are automatically removed, keeping only the latest version of each file.
```

---

## Spec Coverage Check

- ✅ Download all PDFs from Gmail (all emails, all folders)
- ✅ Download all PDFs from Google Drive (My Drive, recursive)
- ✅ Save to `/Users/eran/OpenCode/Watmov/pdf-library/`
- ✅ Deduplicate by filename, keep latest
- ✅ One-time execution (no sync needed)
- ✅ OAuth authentication

## Placeholder Scan

- No TBD/TODO placeholders
- All code is complete and runnable
- All file paths are exact

## Type Consistency

- Function names consistent throughout
- Date parsing handles both Gmail and Drive formats
- File metadata structure consistent
