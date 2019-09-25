#FILE: messsage.py

""" Describes an object which contains all message functionalities and 
properties
"""

import time

class Message:
    def __init__(self, sender_display_name, text_content):
        self.sender_display_name = sender_display_name
        self.text_content = text_content
        self.timestamp = time.gmtime