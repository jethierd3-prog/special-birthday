# Joelea's Birthday Website

A purple, flower-filled birthday website built with Python Flask. It includes an envelope letter, Bible verse carousel, flower messages, a small plantable garden, petal rain, and optional background music.

## Personalize the page

Open `app.py` and edit the `CONFIG` dictionary near the top:

- `birthday_name`: the birthday person's name.
- `from_name`: the name or sign-off at the end of the letter.
- `headline`: the sentence below the heading.
- `letter`: the list of letter paragraphs.
- `verses`: the Bible verses shown in the carousel.
- `flower_messages`: the messages revealed by the six flowers.

The default letter is a sample. Edit it so it sounds like you before sharing the site.

## Upload from an iPhone or iPad

1. Save and extract `joelea-birthday.zip` in the Files app if necessary.
2. Open your GitHub repository in Safari.
3. Tap **Add file → Upload files**.
4. GitHub's web uploader may not upload a folder structure correctly from iOS. If prompted, select the files in the extracted project, keeping the `templates`, `static`, and `.github` folders and their contents in place. If folder upload is difficult, use GitHub on a computer, or upload the ZIP to GitHub as a download archive and extract/upload its contents later.
5. Commit the changes to the repository's `main` branch.

The repository should contain `app.py` at its root, plus `templates/index.html`, `static/css/style.css`, and `static/js/main.js`. Do not leave the files only inside a second nested `joelea-birthday/joelea-birthday/` folder.

## Run locally

Requires Python 3.10 or newer.

```bash
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000` in your browser.

## Deploy with Render

This repository includes `render.yaml` and a `Procfile` for Render.

1. Push the project files to GitHub.
2. Sign in at <https://render.com> using your GitHub account.
3. Choose **New + → Blueprint** (or create a **Web Service** connected to your repository).
4. If creating a Web Service manually, set:
   - Runtime: Python 3
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
   - Health check path: `/healthz`
5. Deploy. Render will display your public website URL when it is ready.

A Flask site needs a Python host such as Render; GitHub Pages alone cannot run the Flask backend.

## Optional music

Put an MP3 you are allowed to use at `static/music/song.mp3`. The music control appears only when the file is present. Browsers require a user tap before they will play audio.

## Included files

```text
joelea-birthday/
├── app.py
├── requirements.txt
├── Procfile
├── render.yaml
├── .python-version
├── .gitignore
├── README.md
├── LICENSE
├── templates/
│   └── index.html
├── static/
│   ├── css/style.css
│   ├── js/main.js
│   └── music/README.txt
└── .github/workflows/check.yml
```
