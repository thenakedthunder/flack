#FILE: channel.py

""" Describes an object which contains all channel functionalities and 
properties
"""

import time
import message

class Channel:
    def __init__(self, name, display_name_of_creator):
        self.channel_name = name
        self.creation_time = time.gmtime
        self.messages = []
        self.participants = [display_name_of_creator]