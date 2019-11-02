# ---------------- IMPORTS ----------------
import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from channel import Channel


# ----------------- SETUP -----------------

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = []


# ---------------- ROUTES -----------------


@app.route("/")
def index():
    return render_template("index.html")


# ---------------- EVENTS -----------------

@socketio.on("channel creation")
def create_channel(data):
    channel_name = data["newChannelName"]

    if (is_channel_name_taken(channel_name)):
        emit("channel name taken", broadcast=True)
        return

    new_channel = Channel(channel_name, 
                          data["display_name_of_creator"])
    channels.append(new_channel)
    emit("new channel created", {"channelName": channel_name}, broadcast=True)

@socketio.on("message submitted")
def add_message_to_channel(data):
    #get data from user input
    message_text = data["messageText"]
    display_name = data["display_name_of_sender"]
    channel_name = data["channelName"]
    
    channel = get_channel_from(channel_name)


def is_channel_name_taken(channel_name):
    """Checks if given channel name is taken"""
    channels_list = (chan.channel_name.lower() for chan in channels)
    if channel_name.lower() in channels_list:
        return True

    return False

def get_channel_from(self, channel_name):
    """gets the channel with the given name from the channels list"""
    channels_with_given_name = [c for c in channels if c.channel_name == 
                                channel_name]
    if channels_with_given_name.count != 1:
        print(channels_with_given_name.count)
        raise RuntimeError("No or more than one channel found with this name")
    
    return channels_with_given_name[0]

