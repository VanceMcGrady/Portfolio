import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import anthropic

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get("messages", [])

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=messages,
    )

    reply = response.content[0].text
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
