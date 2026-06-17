# Watmov PDF Library Downloader

Automated script to download all PDFs from `info@watmov.com.au` Gmail and Google Drive, deduplicate by filename (keeping the latest version), and save them locally.

## Prerequisites

1. Python 3.11+ installed
2. Google Cloud project with Gmail API and Drive API enabled
3. OAuth 2.0 credentials downloaded as `credentials.json`

## Setup

### 1. Install dependencies

```bash
cd scripts
pip install -r requirements.txt
```

### 2. Get Google API credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable APIs:
   - Gmail API
   - Google Drive API
4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > OAuth client ID**
6. Select **Desktop app** as application type
7. Download the JSON file and save it as `credentials.json` in this directory

### 3. Run the script

```bash
python download_pdfs.py
```

On first run, a browser window will open for OAuth authentication. After authenticating, a `token.json` will be saved for future runs.

## Output

PDFs are saved to: `/Users/eran/OpenCode/Watmov/pdf-library/`

- All PDFs from Gmail attachments are downloaded
- All PDFs from Google Drive are downloaded
- Duplicates are automatically removed, keeping only the latest version of each file

## What it does

1. **Authenticates** with Google using OAuth2
2. **Scans Gmail** for all emails with PDF attachments (all folders)
3. **Scans Google Drive** for all PDF files (recursive)
4. **Downloads** all PDFs to the local directory
5. **Deduplicates** by filename, keeping the most recent version
6. **Reports** summary of files downloaded and duplicates removed

## Notes

- The script only downloads files, it does not delete anything from Gmail or Drive
- Deduplication is based on filename only (not content)
- The latest version is determined by email date (Gmail) or modified time (Drive)
- OAuth token is saved locally as `token.json` for subsequent runs
