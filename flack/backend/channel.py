#FILE: channel.py

""" Describes an object which contains all channel functionalities and 
properties
"""

from datetime import datetime, timedelta
import message
import enum 
  

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
        """returns a string that the app will render on the frontend side to
        display the time of creation
        """
        self._check_if_creation_time_is_valid()

        day_of_creation = self._get_day_of_creation()
        time_of_creation = self._get_time_of_creation()

        return f"{day_of_creation} at {time_of_creation}"

    def _get_day_of_creation(self):
        """for date calculations, we are only interested in the date (having 
        the time part would throw off calculations)"""
        diff_in_days = self._get_how_many_days_ago_was_creation()

        if diff_in_days == 0:
            return "today"
        elif diff_in_days == 1:
            return "yesterday"
        elif diff_in_days < 7:
            return self.creation_time.strftime("on %A")     #returns day name
        else:
            return self._get_formatted_date()       #returns full date

    def _get_time_of_creation(self):
        """WARNING: '%#H' works on Windows, but on UNIX??? ('%-H' can be tried 
        there)
        returns H:MM format (padding zeroes for minutes but not for hours)
        """
        return self.creation_time.strftime("%#H:%M")

    def _check_if_creation_time_is_valid(self):
        """an error is thrown when the creation time is later than the current
        time, as this should not happen"""
        if self.creation_time > datetime.now():
            raise ValueError("Invalid creation time: it is later than current system time")

    def _get_how_many_days_ago_was_creation(self):
        return (datetime.today().date() - self.creation_time.date()).days
   
    def _get_formatted_date(self):
        """WARNING: '%#d' works on Windows, but on UNIX??? ('%-d' can be tried 
        there)
        if the creation was not this year, the date returned contains the year
        """
        if (datetime.today().year == self.creation_time.year):
            return self.creation_time.strftime("on %A, %#d %b")
        else:
            return self.creation_time.strftime("on %A, %#d %b %Y")
