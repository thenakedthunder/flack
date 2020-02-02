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
        self.creator_name = display_name_of_creator
        self.participants = [display_name_of_creator]

    def serialize(self):
        return {
            'channelName': self.channel_name,
            'creation_time': self.creation_time,
            'messages': self.messages,
            'creatorDisplayName': self.creator_name,
            'participants': self.participants
        }