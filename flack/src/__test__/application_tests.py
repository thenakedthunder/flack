"""Imports"""

import unittest
import sys
sys.path.append('C:/Users/CS50W/project2/flack/backend')

import application
from channel import Channel


class application_tests(unittest.TestCase):
    
    """Unit Tests"""

    def test_1_channel_name_not_taken(self):
        """channel_name_taken test: empty channels list"""
        application.channels.clear()
        self.assertFalse(application.is_channel_name_taken("dave"))

    def test_2_channel_name_not_taken_one_entry_in_list(self):
        """channel_name_taken test: channel list with one entry"""
        self.setup_channels_list_with([Channel("roger", "Pink")])
        self.assertFalse(application.is_channel_name_taken("Dave"))

    def test_3_channel_name_taken_one_entry_in_list(self):
        """channel_name_taken test: channel list with one entry"""
        self.setup_channels_list_with([Channel("dave", "Pink")])
        self.assertTrue(application.is_channel_name_taken("Dave"))

    def test_4_channel_name_not_taken_multiple_entries_in_list(self):
        """channel_name_taken test: channel list with more entries"""
        self.setup_channels_list_with([Channel("roger", "Pink"), 
                                       Channel("dave", "Pink"),
                                       Channel("rick", "Pink"),
                                       Channel("nick", "Pink")])
        self.assertFalse(application.is_channel_name_taken("Syd"))

    def test_5_channel_name_taken_multiple_entries_in_list(self):
        """channel_name_taken test: channel list with more entries"""
        self.setup_channels_list_with([Channel("roger", "Pink"), 
                                       Channel("dave", "Pink"),
                                       Channel("rick", "Pink"),
                                       Channel("nick", "Pink")])
        self.assertTrue(application.is_channel_name_taken("Dave"))

    #def test_6_is_creator_of_channel_in_participants_list(self):
    #    """channel creation test: checks if the channel creator is included in 
    #    the participants list"""
    #    self.setup_channels_list_with([Channel("Dirty Fred the Captain",
    #                                           "P.Howard")])
    #    self.assertTrue("P.Howard" in application.channels[0].participants)

    #def test_7_is_creator_of_channel_in_participants_list(self):
    #    """channel creation test: checks for a display name that is not 
    #    included in the participants list"""
    #    self.setup_channels_list_with([Channel("Dirty Fred the Captain",
    #                                           "P.Howard")])
    #    self.assertFalse("Pink" in application.channels[0].participants)

    #def test_8_message_given_to_channel(self):
    #    """add_message_to_channel test: new message is given to the channel"""
    #    self.setup_channels_list_with([Channel("Roger", "Pink")])
        
    #    data = {'messageText': 'insert something funny here', 
    #            'display_name_of_sender': 'the_real_James_Bond',
    #            'channelName': 'Roger'}
    #    application.add_message_to_channel(data)
        
    #    message_contents_list = (msg.text_content for msg in 
    #                             application.channels[0].messages)
    #    self.assertTrue('insert something funny here' in message_contents_list)
    #    self.assertFalse('insert something NOT funny here' in 
    #                     message_contents_list)

    #    sender_name = application.channels[0].messages[0].sender_name
    #    self.assertTrue(sender_name == "the_real_James_Bond")
    #    self.assertFalse(sender_name == "the_FAKE_James_Bond")

    #def test_9_get_channel_from_test(self):
    #    """get_channel_from test: gets a channel from the channels list"""
    #    self.setup_channels_list_with([Channel("roger", "Pink"), 
    #                                   Channel("dave", "Pink"),
    #                                   Channel("rick", "Pink"),
    #                                   Channel("nick", "Pink")])

    #    channel_found = application.get_channel_from("dave")
    #    self.assertTrue("Pink" in channel_found.participants)


    # Test Setup

    def setup_channels_list_with(self, new_list):
        application.channels.clear()
        application.channels.extend(new_list)


if __name__ == "__main__":
    unittest.main()