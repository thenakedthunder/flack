#FILE: channel.py

""" Describes an object which contains all channel functionalities and 
properties
"""

from datetime import datetime, timedelta
import message

class Channel:
    def __init__(self, name, display_name_of_creator):
        self.channel_name = name
        self.creation_time = datetime.now()
        self.messages = []
        self.creator_name = display_name_of_creator
        self.participants = [display_name_of_creator]

    def serialize(self):
        return {
            'channelName': self.channel_name,
            'creation_time': self.__get_formatted_creation_time(creation_time),
            'messages': self.messages,
            'creatorDisplayName': self.creator_name,
            'participants': self.participants
        }

    #def __get_formatted_creation_time(self, creation_time):

    def creation_was_today(self):
        return (datetime.today().date() - self.creation_time.date()).days < 1

    def creation_was_yesterday(self):
        return (datetime.today().date() - self.creation_time.date()).days == 1

    def creation_was_within_a_week(self):
        diff = datetime.today() - self.creation_time
        
        if diff.microseconds < 0:
            raise ValueError("the time of creation can not be later than " +
                "the current time")
        return diff.days < 7
        