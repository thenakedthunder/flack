import os

from flask import Flask, render_template, request
from flask_cors  import CORS, cross_origin
from flask_socketio import SocketIO, emit

from channel import Channel


app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
# needed for CORS problems in React debug mode
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/channel_creation": {"origins": "http://localhost:port"}})

socketio = SocketIO(app)


channels = []


# -------------------- ROUTES --------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/channel_creation", methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def create_channel():
    data = request.json
    channel_name = data["newChannelName"]
    
    if (is_channel_name_taken(channel_name)):
        response = 'FAILED'
    
    else:
        new_channel = Channel(channel_name, data["display_name_of_creator"])
        channels.append(new_channel)
    
        socketio.emit("new channel created", 
             {"channels": [channel.serialize() for channel in channels]}, 
             broadcast=True)

        response = 'SUCCESS'

    return response


# ------------------- SOCKETS -------------------

@socketio.on("message submitted")
def add_message_to_channel(data):
    #get data from user input
    message_text = data["messageText"]
    display_name = data["display_name_of_sender"]
    channel_name = data["channelName"]
    
    channel = get_channel_from(channel_name)


# ---------------- HELPER FUNCTIONS ----------------

def is_channel_name_taken(channel_name):
    """Checks if given channel name is taken"""
    channels_list = (chan.channel_name.lower() for chan in channels)
    if channel_name.lower() in channels_list:
        return True

    return False

#def get_channel_from(channel_name):
#    """gets the channel with the given name from the channels list"""
#    channels_with_given_name = [c for c in channels if c.channel_name == 
#                                channel_name]
#    if channels_with_given_name.count != 1:
#        print(channels_with_given_name.count)
#        raise RuntimeError("No or more than one channel found with this name")
    
#    return channels_with_given_name[0]


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')