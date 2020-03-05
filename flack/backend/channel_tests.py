import unittest
import sys
from datetime import datetime, timedelta

sys.path.append('C:/Users/CS50W/project2/flack/backend')

import application
from channel import Channel
from channel_registry import Channel_registry


class channel_tests(unittest.TestCase):
    
    def setUp(self):
        self.channel_registry = application.channel_registry
        self.day_names = ["Monday", "Tuesday", "Wednesday", "Thursday",
                         "Friday", "Saturday", "Sunday"]
    
    """Unit Tests for channel.py"""

    """Tests for creation_was_today"""
    def test_creation_was_today_with_same_day(self):
        """creation_was_today should return true when the current date and 
        the creation date are on the same day"""
        
        test_channel = Channel("Kerekes", "Tanyasi Jóska")
        #input without time details
        test_channel.creation_time = datetime.today()   

        self.assertTrue(test_channel.creation_was_today())


    def test_creation_was_today_when_creation_time_yesterday(self):
        """should return false when the current date and the creation date are one 
        day apart"""

        test_channel = Channel("Zuboly", "Kérsz Taslit?")
        test_channel.creation_time = datetime.today() - timedelta(1)

        self.assertFalse(test_channel.creation_was_today())


    def test_creation_was_today_when_creation_time_one_year_ago(self):
        """should return false when the two dates are one year apart 
        (doesn't account for leap years)"""

        test_channel = Channel("John Henry", "My Ballad") 
        test_channel.creation_time = datetime.today() - timedelta(365)

        self.assertFalse(test_channel.creation_was_today())
     

    """Tests for creation_was_yesterday"""

    def test_creation_was_yesterday_with_same_day_input(self):
        """should return false when the current date and the creation date are 
        on the same day"""
        test_channel = Channel("Kerekes", "Tanyasi Jóska")

        self.assertFalse(test_channel.creation_was_yesterday())

    def test_creation_was_yesterday_when_creation_time_yesterday(self):
        """should return true when the creation date was a day before the 
        current date """
        test_channel = Channel("Zuboly", "Kérsz Taslit?")
        test_channel.creation_time = datetime.today() - timedelta(1)

        self.assertTrue(test_channel.creation_was_yesterday())

    def test_creation_was_yesterday_when_creation_time_tomorrow(self):
        """should return false when the creation date was a day after the 
        current date (this should never happen in the app anyway)"""
        test_channel = Channel("John Henry", "My Ballad")
        test_channel.creation_time = datetime.today() + timedelta(1)

        self.assertFalse(test_channel.creation_was_yesterday())


    """Tests for creation_was_within_a_week"""

    def test_creation_was_within_a_week(self):
        """should return true when the current date and the creation date are 
        from the same day"""
        test_channel = Channel("Kerekes", "Tanyasi Jóska")

        self.assertTrue(test_channel.creation_was_within_a_week())
    
    def test_creation_was_within_a_week_when_creation_time_was_6_days_ago(self):
        """should return true when the current date and the creation date are 
        6 days apart"""
        test_channel = Channel("Joe Bonamassa", "Black Rock")
        test_channel.creation_time = datetime.today() - timedelta(6)

        self.assertTrue(test_channel.creation_was_within_a_week())

    def test_creation_was_within_a_week_when_creation_time_was_7_days_ago(self):
        """should return true when the current date and the creation date are 
        7 days apart"""
        test_channel = Channel("Joe Bonamassa", "Black Rock")
        test_channel.creation_time = datetime.today() - timedelta(7)

        self.assertFalse(test_channel.creation_was_within_a_week())

    def test_creation_was_in_the_future(self):
        """should not accept a creation time later than the current time"""
        with self.assertRaises(Exception):
            test_channel = Channel("Joe Bonamassa", "Black Rock")
            test_channel.creation_time = datetime.today() + timedelta(1)
            test_channel.creation_was_within_a_week()



#    it("should not accept a creation time later than the current time",
#        () => {
#            expect(() =>
#            {
#                SecondaryTextHelper.creationWasWithinAWeek(
#                    moment().startOf('day').add(1, 'days'))
#            }).toThrow(RangeError("the time of creation can not be later " +
#                "than the current time"));
#        }
#    )
#}) 



    #def test_channel_serialize(self):
    #    """serialize tests: fresh channel with no messages or participants
    #    (just the creator)"""
    #    data = {
    #      "newChannelName": "a channel for idiots",
    #      "display_name_of_creator": "the king of all idiots"
    #    }
    #    self.channel_registry.add_new_channel_to_channels_list(data)

    #    channel = self.channel_registry.get_channel_list()[-1]
    #    channel_serialized = channel.serialize()

    #    self.assertIsInstance(channel_serialized, dict)
    #    self.assertEqual(channel_serialized["channelName"], 
    #                     "a channel for idiots")
    #    self.assertEqual(channel_serialized["creatorDisplayName"],
    #                     "the king of all idiots")
    #    self.assertEqual(channel_serialized["participants"][0], 
    #                     "the king of all idiots")
    #    self.assertEqual(len(channel_serialized["messages"]), 0)


if __name__ == "__main__":
    unittest.main()