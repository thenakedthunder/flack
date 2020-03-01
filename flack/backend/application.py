# ------------------- IMPORTS -------------------

import os

from flask import Flask, render_template, request
from flask_cors  import CORS, cross_origin
from flask_socketio import SocketIO, emit

from channel import Channel
from channel_registry import Channel_registry



# ------------------ APP SETUP ------------------

app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# needed for CORS problems in React debug mode
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/channel_creation": {"origins": "*"}})

socketio = SocketIO(app)

# for keeping track of existing channels
channel_registry = Channel_registry.getInstance()


# -------------------- ROUTES --------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/channel_creation", methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def create_channel():
    data = request.json
    response = channel_registry.get_response_for_channel_creation_request(
        data["newChannelName"])
    
    if (response == 'SUCCESS'):
        channel_registry.add_new_channel_to_channels_list(data)
        update_channels_from_server_memory()

    return response



# ------------------- SOCKETS -------------------


@socketio.on("update channels")
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def update_channels():
    if not(channel_registry.is_channel_list_empty()):
        update_channels_from_server_memory()  

#TODO: helper method, find a good place for it!
def update_channels_from_server_memory():
    socketio.emit("new channel(s) in memory", 
         {"channels": [channel.serialize() for channel in 
                       channel_registry.get_channel_list()]}, 
         broadcast=True)

#@socketio.on("message submitted")
#def add_message_to_channel(data):
#    #get data from user input
#    message_text = data["messageText"]
#    display_name = data["display_name_of_sender"]
#    channel_name = data["channelName"]
    
#    channel = channel_registry.get_channel_from(channel_name)





if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')