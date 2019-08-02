import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from channel import Channel


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

    if (is_channel_name_taken(channel_name)):
        emit("channel name taken", broadcast=True)
        return

    new_channel = Channel(channel_name.lower(), 
                          data["display_name_of_creator"])
    channels.append(new_channel)
    emit("new channel created", {"channelName": channel_name}, broadcast=True)


def is_channel_name_taken(channel_name):
    channels_list = (chan.channel_name for chan in channels)
    if channel_name.lower() in channels_list:
        return True

    return False
