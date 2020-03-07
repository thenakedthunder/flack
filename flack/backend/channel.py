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
            'creationTime': self._get_formatted_creation_time(),
            'messages': self.messages,
            'creatorDisplayName': self.creator_name,
            'participants': self.participants
        }

    def _get_formatted_creation_time(self):
        day_of_creation = self._get_day_of_creation()
        time_of_creation = self._get_time_of_creation()

        return f"{day_of_creation} at {time_of_creation}"


    def _get_day_of_creation(self):
        """for date calculations, we are only interested in the date (having 
        the time part would throw off calculations)"""
        #date_of_creation = self.creation_time.date()

        if self._creation_was_today():
            return "today"
        if self._creation_was_yesterday():
            return "yesterday"
        if self._creation_was_within_a_week():
            return self.creation_time.strftime("on %A")

        return self._get_formatted_date()

    def _get_time_of_creation(self):
        """WARNING: '%#H' works on windows, but on UNIX??? ('%-H' can be tried 
        there)"""

        return self.creation_time.strftime("%#H:%M")

    def _creation_was_today(self):
        return (datetime.today().date() - self.creation_time.date()).days < 1

    def _creation_was_yesterday(self):
        return (datetime.today().date() - self.creation_time.date()).days == 1

    def _creation_was_within_a_week(self):
        return (datetime.today().date() - self.creation_time.date()).days < 7
       
    def _get_formatted_date(self):
        """WARNING: '%#d' works on windows, but on UNIX??? ('%-d' can be tried 
        there)"""
        if (datetime.today().year == self.creation_time.year):
            return self.creation_time.strftime("on %A, %#d %b")
        else:
            return self.creation_time.strftime("on %A, %#d %b %Y")
