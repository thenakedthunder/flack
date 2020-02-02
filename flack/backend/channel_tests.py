import unittest
import sys
sys.path.append('C:/Users/CS50W/project2/flack/backend')

import application
from channel import Channel
from channel_registry import Channel_registry


class channel_tests(unittest.TestCase):
    
    def setUp(self):
        self.channel_registry = application.channel_registry
    
    """Unit Tests for channel.py"""

    def test_channel_serialize(self):
        """serialize tests: fresh channel with no messages or participants
        (just the creator)"""
        data = {
          "newChannelName": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        self.channel_registry.add_new_channel_to_channels_list(data)

        channel = self.channel_registry.get_channel_list()[-1]
        channel_serialized = channel.serialize()

        self.assertIsInstance(channel_serialized, dict)
        self.assertEqual(channel_serialized["channelName"], 
                         "a channel for idiots")
        self.assertEqual(channel_serialized["creatorDisplayName"],
                         "the king of all idiots")
        self.assertEqual(channel_serialized["participants"][0], 
                         "the king of all idiots")
        self.assertEqual(len(channel_serialized["messages"]), 0)


if __name__ == "__main__":
    unittest.main()