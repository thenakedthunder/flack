"""Imports"""

import unittest
import sys
sys.path.append('C:/Users/CS50W/project2/flack/backend')

import application
from channel import Channel
from channel_registry import Channel_registry


class channel_registry_tests(unittest.TestCase):

    def setUp(self):
        self.channel_registry = application.channel_registry
    
    """Unit Tests"""

    def test_channel_name_not_taken(self):
        """channel_name_taken test: empty channels list"""
        self.channel_registry.clear_channel_list()
        self.assertFalse(self.channel_registry.is_channel_name_taken("dave"))

    def test_channel_name_not_taken_one_entry_in_list(self):
        """channel_name_taken test: channel list with one entry"""
        self.channel_registry.setup_channels_list_with(
            [Channel("roger", "Pink")])
        self.assertFalse(self.channel_registry.is_channel_name_taken("Dave"))

    def test_channel_name_taken_one_entry_in_list(self):
        """channel_name_taken test: channel list with one entry"""
        self.channel_registry.setup_channels_list_with(
            [Channel("dave", "Pink")])
        self.assertTrue(self.channel_registry.is_channel_name_taken("Dave"))

    def test_channel_name_not_taken_multiple_entries_in_list(self):
        """channel_name_taken test: channel list with more entries"""
        self.channel_registry.setup_channels_list_with([
            Channel("roger", "Pink"), 
            Channel("dave", "Pink"),
            Channel("rick", "Pink"),
            Channel("nick", "Pink")])
        self.assertFalse(self.channel_registry.is_channel_name_taken("Syd"))

    def test_channel_name_taken_multiple_entries_in_list(self):
        """channel_name_taken test: channel list with more entries"""
        self.channel_registry.setup_channels_list_with([
            Channel("roger", "Pink"), 
            Channel("dave", "Pink"),
            Channel("rick", "Pink"),
            Channel("nick", "Pink")])
        self.assertTrue(self.channel_registry.is_channel_name_taken("Dave"))

    def test_response_success_for_channel_creation_request(self):
        """get_response_for_channel_creation_request test"""
        self.channel_registry.setup_channels_list_with([
            Channel("roger", "Pink")])
        self.assertEqual(
            self.channel_registry.get_response_for_channel_creation_request(
            "Dave"), "SUCCESS")

    def test_response_failed_for_channel_creation_request(self):
        """get_response_for_channel_creation_request test"""
        self.channel_registry.setup_channels_list_with(
            [Channel("dave", "Pink")])
        self.assertEqual(
            self.
            channel_registry.get_response_for_channel_creation_request(
                "Dave"), "CHANNEL_NAME_TAKEN")

    def test_add_new_channel_to_empty_channels_list(self):
        """add_new_channel_to_channels_list test"""
        self.channel_registry.clear_channel_list()

        data = {
          "new_channel_name": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        self.channel_registry.add_new_channel_to_channels_list(data)
        
        channels = self.channel_registry.get_channel_list()
        self.assertEqual(len(channels), 1)
        self.assertEqual(channels[0].channel_name, "a channel for idiots")
        self.assertEqual(channels[0].participants[0], "the king of all idiots")

    def test_add_new_channel_to_list_with_one_channel(self):
        """add_new_channel_to_channels_list test"""
        self.channel_registry.setup_channels_list_with([
            Channel("dave", "Pink")])
        
        data = {
          "new_channel_name": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        self.channel_registry.add_new_channel_to_channels_list(data)
        
        channels = self.channel_registry.get_channel_list()
        self.assertEqual(len(channels), 2)
        self.assertEqual(channels[-1].channel_name, "a channel for idiots")
        self.assertEqual(channels[-1].participants[0], "the king of all idiots")
    
    def test_add_new_channel_to_list_with_multiple_channels(self):
        """add_new_channel_to_channels_list test"""
        self.channel_registry.setup_channels_list_with([
            Channel("roger", "Pink"), 
            Channel("dave", "Pink"),
            Channel("rick", "Pink"),
            Channel("nick", "Pink")])
        
        data = {
          "new_channel_name": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        self.channel_registry.add_new_channel_to_channels_list(data)
        
        channels = self.channel_registry.get_channel_list()
        self.assertEqual(len(channels), 5)
        self.assertEqual(channels[-1].channel_name, "a channel for idiots")
        self.assertEqual(channels[-1].participants[0], 
                         "the king of all idiots")

    def test_is_creator_of_channel_in_participants_list(self):
        """channel creation test: checks if the channel creator is included in 
        the participants list"""
        self.channel_registry.setup_channels_list_with([
            Channel("Dirty Fred the Captain", "P.Howard")])
        self.assertTrue("P.Howard" in self.channel_registry.
                        get_channel_list()[0].participants)

    def test_is_creator_of_channel_in_participants_list(self):
        """channel creation test: checks for a display name that is not 
        included in the participants list"""
        self.channel_registry.setup_channels_list_with([
            Channel("Dirty Fred the Captain", "P.Howard")])
        self.assertFalse("Pink" in self.channel_registry.
                         get_channel_list()[0].participants)

    def test_is_channel_list_empty_with_empty_list(self):
        """the is_channel_list_empty function should return true if the stored
        list is empty"""
        self.channel_registry.clear_channel_list()
        result = self.channel_registry.is_channel_list_empty()

        self.assertTrue(result)

    def test_is_channel_list_empty_with_a_one_item_list(self):
        """the is_channel_list_empty function should return false if the stored
        list has an element"""
        self.channel_registry.setup_channels_list_with([
            Channel("Dirty Fred the Captain", "P.Howard")])
        result = self.channel_registry.is_channel_list_empty()

        self.assertFalse(result)

    def test_is_channel_list_empty_with_a_list_with_more_items(self):
        """the is_channel_list_empty function should return false if the stored
        list has more elements"""
        self.channel_registry.setup_channels_list_with([
            Channel("roger", "Pink"), 
            Channel("dave", "Pink"),
            Channel("rick", "Pink"),
            Channel("nick", "Pink")])
        result = self.channel_registry.is_channel_list_empty()

        self.assertFalse(result)

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




if __name__ == "__main__":
    unittest.main()