"""Imports"""

import unittest
import sys
sys.path.append("..") # Adds higher directory to python modules path.

from application import is_channel_name_taken, channels

class application_tests(unittest.TestCase):
    
    """Unit Tests"""

    def test_channel_name_not_taken_1(self):
        """channel_name_taken test: empty channels list"""
        channels.clear()
        self.assertFalse(is_channel_name_taken("dave"))

    def test_channel_name_not_taken_2(self):
        """channel_name_taken test: channel list with one entry"""
        self.setup_channels_list_with(["roger"])
        self.assertFalse(is_channel_name_taken("Dave"))

    def test_channel_name_taken_3(self):
        """channel_name_taken test: channel list with one entry"""
        self.setup_channels_list_with(["dave"])
        self.assertTrue(is_channel_name_taken("Dave"))

    def test_channel_name_taken_4(self):
        """channel_name_taken test: channel list with more entries"""
        self.setup_channels_list_with(["roger", "dave", "rick", "nick"])
        self.assertFalse(is_channel_name_taken("Syd"))

    def test_channel_name_taken_5(self):
        """channel_name_taken test: channel list with more entries"""
        self.setup_channels_list_with(["roger", "dave", "rick", "nick"])
        self.assertTrue(is_channel_name_taken("Dave"))


    # Test Setup

    def setup_channels_list_with(self, new_list):
        channels.clear()
        channels.extend(new_list)


if __name__ == "__main__":
    unittest.main()