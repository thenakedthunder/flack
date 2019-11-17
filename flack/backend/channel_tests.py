import unittest
import sys
sys.path.append('C:/Users/CS50W/project2/flack/backend')

import application
import channel


class channel_tests(unittest.TestCase):
    
    """Unit Tests for channel.py"""

    def test_channel_serialize(self):
        """serialize tests: fresh channel with no messages or participants
        (just the creator)"""
        data = {
          "newChannelName": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        application.add_new_channel_to_channels_list(data)

        channel = application.get_channel_list()[-1]
        channel_serialized = channel.serialize()

        self.assertIsInstance(channel_serialized, dict)
        self.assertEqual(channel_serialized["channelName"], 
                         "a channel for idiots")
        self.assertEqual(channel_serialized["participants"][0], 
                         "the king of all idiots")
        self.assertEqual(len(channel_serialized["messages"]), 0)


if __name__ == "__main__":
    unittest.main()