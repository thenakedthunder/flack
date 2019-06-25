import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = []


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("channel creation")
def create_channel(data):
    channel_name = data["newChannelName"]

    if (channel_name_taken(channel_name)):
        emit("channel name taken", broadcast=True)
        return

    channels.append(channel_name)
    emit("new channel created", {"channelName": channel_name}, broadcast=True)


def channel_name_taken(channel_name):
    if channel_name in channels:
        return True;

    return False;
