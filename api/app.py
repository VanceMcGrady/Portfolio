import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import anthropic
from system_prompt import SYSTEM_PROMPT

load_dotenv()

app = Flask(__name__)
CORS(app)


client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

TOOLS = [
    {
        "name": "send_contact_email",
        "description": (
            "Send an email to Vance on behalf of a visitor who wants to get in touch. "
            "Only call this tool after you have collected the visitor's name, their preferred "
            "contact method, and their contact details. Optionally include a message."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "visitor_name": {
                    "type": "string",
                    "description": "The visitor's name.",
                },
                "contact_preference": {
                    "type": "string",
                    "description": "How the visitor prefers to be contacted (e.g. email, LinkedIn, phone).",
                },
                "contact_info": {
                    "type": "string",
                    "description": "The visitor's contact details matching their preference (e.g. an email address, LinkedIn URL, or phone number).",
                },
                "message": {
                    "type": "string",
                    "description": "Any message or context the visitor wants to share with Vance.",
                },
            },
            "required": ["visitor_name", "contact_preference", "contact_info"],
        },
    }
]


def send_contact_email(visitor_name, contact_preference, contact_info, message=""):
    sender = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASSWORD")
    recipient = "vancemcgrady@gmail.com"

    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = f"Portfolio Contact: {visitor_name}"

    body = f"""Someone reached out through your portfolio chatbot.

Name:             {visitor_name}
Contact method:   {contact_preference}
Contact details:  {contact_info}
Message:          {message or "None provided"}
"""
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())


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
        system=SYSTEM_PROMPT,
        tools=TOOLS,
        messages=messages,
    )

    if response.stop_reason == "tool_use":
        tool_block = next(b for b in response.content if b.type == "tool_use")

        try:
            send_contact_email(**tool_block.input)
            tool_result = "Email sent successfully."
        except Exception as e:
            tool_result = f"Failed to send email: {str(e)}"

        follow_up = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=[
                *messages,
                {"role": "assistant", "content": response.content},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "tool_result",
                            "tool_use_id": tool_block.id,
                            "content": tool_result,
                        }
                    ],
                },
            ],
        )
        reply = next(b for b in follow_up.content if b.type == "text").text
    else:
        reply = next(b for b in response.content if b.type == "text").text

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
