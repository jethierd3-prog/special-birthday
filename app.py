"""Joelea's Birthday Website — Flask application.

Personalize the CONFIG values below before sharing the website.
"""
from flask import Flask, jsonify, render_template
import os

app = Flask(__name__)

CONFIG = {
    "birthday_name": "Joelea",
    "from_name": "With love and prayers",
    "headline": "A little birthday garden, made just for you",
    "letter_title": "A little note for your birthday",
    "letter": [
        "Happy birthday, Joelea! I hope this new year of your life brings you peace, joy, good health, and many reasons to smile.",
        "May you keep growing into the person God created you to be. Even on ordinary days, I hope you remember that your life has value, your kindness matters, and you are appreciated more than you know.",
        "May God guide your steps, strengthen your faith, and fill your days with people and moments that bring you closer to Him. Keep shining in your own gentle way.",
        "Thank you for being you. I pray that this birthday is the beginning of a year filled with meaningful memories, answered prayers, and beautiful new beginnings."
    ],
    "verses": [
        {"ref": "Numbers 6:24–26", "text": "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace."},
        {"ref": "Psalm 20:4", "text": "Grant thee according to thine own heart, and fulfil all thy counsel."},
        {"ref": "Jeremiah 29:11", "text": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."}
    ],
    "flower_messages": [
        {"flower": "Lavender", "message": "May your days be calm, gentle, and full of peace."},
        {"flower": "Rose", "message": "You deserve kindness, sincere care, and reasons to smile."},
        {"flower": "Daisy", "message": "May you notice little joys in even the simplest days."},
        {"flower": "Tulip", "message": "May new opportunities bloom at the right time."},
        {"flower": "Sunflower", "message": "Keep looking toward the light, even when the road feels long."},
        {"flower": "Cherry blossom", "message": "May every season bring growth, hope, and beautiful beginnings."}
    ]
}


def music_is_available() -> bool:
    """Only display the music control when a song has actually been added."""
    music_path = os.path.join(app.static_folder, "music", "song.mp3")
    return os.path.isfile(music_path) and os.path.getsize(music_path) > 0


@app.route("/")
def home():
    return render_template(
        "index.html",
        config=CONFIG,
        music_available=music_is_available(),
    )


@app.route("/healthz")
def healthz():
    """Small health-check endpoint used by Render."""
    return jsonify(status="ok"), 200


if __name__ == "__main__":
    # For local development only. Render uses Gunicorn from the Procfile.
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")), debug=True)
