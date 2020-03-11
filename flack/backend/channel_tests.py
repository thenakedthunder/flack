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

    """Tests for check_if_creation_time_is_valid"""

    def test__check_if_creation_time_is_valid_with_valid_input(self):
        """should NOT throw an exception when creation time is earlier than the
        current system time
        """
        test_channel = Channel("Kerekes", "Tanyasi Jóska")

        try:
            test_channel._check_if_creation_time_is_valid()
        except:
            raised = True
    
            self.assertFalse(raised, 'Exception raised')

    def test__check_if_creation_time_is_valid_with_invalid_input_an_hour_later(self):
        """should throw an exception when creation time is later than the 
        current system time
        """
        test_channel = Channel("Kerekes", "Tanyasi Jóska")
        test_channel.creation_time = datetime.now() + timedelta(seconds=3600)
        
        with self.assertRaises(ValueError): 
            test_channel._check_if_creation_time_is_valid()
           
    def test__check_if_creation_time_is_valid_with_invalid_input_a_day_later(self):
        """should throw an exception when creation time is later than the 
        current system time
        """
        test_channel = Channel("Kerekes", "Tanyasi Jóska")
        test_channel.creation_time = datetime.now() + timedelta(1)
        
        with self.assertRaises(ValueError): 
            test_channel._check_if_creation_time_is_valid()


    """Tests for get_how_many_days_ago_was_creation"""
    def test_get_how_many_days_ago_was_creation_today(self):
        """should return 0 if the creation day is the current day"""
        test_channel = Channel("Kerekes", "Tanyasi Jóska")

        self.assertEqual(test_channel._get_how_many_days_ago_was_creation(), 0)

    def test_get_how_many_days_ago_was_creation_yesterday(self):
        """should return 1 if the creation day is the day before the current 
        day"""
        test_channel = Channel("Kérsz Taslit?", "Zuboly")
        test_channel.creation_time = datetime.today() - timedelta(1) 

        self.assertEqual(test_channel._get_how_many_days_ago_was_creation(), 1)

    def test_get_how_many_days_ago_was_creation_6_days_ago(self):
        """should return 6 when the current date and the creation date are 
        6 days apart"""
        test_channel = Channel("Black Rock", "Joe Bonamassa")
        test_channel.creation_time = datetime.today() - timedelta(6)

        self.assertEqual(test_channel._get_how_many_days_ago_was_creation(), 6)
  
    def test_get_how_many_days_ago_was_creation_7_days_ago(self):
        """should return 7 when the current date and the creation date are 
        7 days apart"""
        test_channel = Channel("My Ballad", "John Henry")
        test_channel.creation_time = datetime.today() - timedelta(7)

        self.assertEqual(test_channel._get_how_many_days_ago_was_creation(), 7)

    def test_get_how_many_days_ago_was_creation_366_days_ago(self):
        """should return 366 when the current date and the creation date are 
        366 days apart. 
        NOTE: using days instead of years is intentional (leap years!)
        """
        test_channel = Channel("My Ballad", "John Henry")
        test_channel.creation_time = datetime.today() - timedelta(366)

        self.assertEqual(test_channel._get_how_many_days_ago_was_creation(),
                        366)


    """Tests for get_formatted_date"""

    def test_get_formatted_date_for_date_from_this_year(self):
        """should return the shorter format when the current date and the 
        creation date are in the same year"""
        test_channel = Channel("Dire Straits", "Mark Knopfler")
        test_channel.creation_time = datetime.today().replace(month = 2, 
                                                              day = 10)

        #splitting up the result that came in an "on _dayname_, dd mon" format
        result = test_channel._get_formatted_date()
        day_part, date_part = result.split(", ")
        on_prefix, day_name = day_part.split()

        self.assertEqual(on_prefix, "on")       #asserting the first part
        self.assertIn(day_name, self.day_names)     #checking the day name part
        self.assertEqual(date_part, "10 Feb")   #checking  the date part
        
    def test_get_formatted_date_for_date_from_another_year(self):
        """should return the longer format when the current date and the 
        creation date are not in the same year"""
        test_channel = Channel("Black County Communion", "Glenn Hughes")
        test_channel.creation_time = datetime.fromisoformat('2017-12-22')

        result = test_channel._get_formatted_date()
        self.assertEqual(result, "on Friday, 22 Dec 2017")        

    
    """Tests for get_time_of_creation"""

    def test_get_time_of_creation_midnight(self):
        """should return the creation time with the correct zero formats (one 
        digit for hours, two for minutes) when it was at midnight"""
        test_channel = Channel("Scenes From a Memory", "Dream Theater")
        test_channel.creation_time = datetime.fromisoformat(
            '2013-02-08 00:00:00.000')

        self.assertEqual(test_channel._get_time_of_creation(), "0:00")

    def test_get_time_of_creation_morning(self):
        """should return the creation time in the correct format (no leading 
        zeroes for hours)"""
        test_channel = Channel("Scenes From a Memory", "Dream Theater")
        test_channel.creation_time = datetime.fromisoformat(
            '2013-02-08 09:07:00.000')

        self.assertEqual(test_channel._get_time_of_creation(), "9:07")

    def test_get_time_of_creation_afternoon(self):
        """should return the creation time in the '24H' format"""
        test_channel = Channel("Scenes From a Memory", "Dream Theater")
        test_channel.creation_time = datetime.fromisoformat(
            '2020-02-10 14:30:00.000')

        self.assertEqual(test_channel._get_time_of_creation(), "14:30")


    """Tests for get_day_of_creation"""

    def test_get_day_of_creation_on_same_day(self):
        """should return 'today' if the creation date is the same as the
        current date"""
        test_channel = Channel("Cream", "Strange Brew")

        self.assertEqual(test_channel._get_day_of_creation(), "today")

    def test_get_day_of_creation_from_yesterday(self):
        """should return 'yesterday' if the creation date is a day before the
        current date"""
        test_channel = Channel("Cream", "Strange Brew")
        test_channel.creation_time = datetime.today() - timedelta(1)

        self.assertEqual(test_channel._get_day_of_creation(), "yesterday")

    def test_get_day_of_creation_from_6_days_back(self):
        """should return the correct format without year if the creation date 
        was within a week of the current date"""
        test_channel = Channel("Cream", "Strange Brew")
        test_channel.creation_time = datetime.today() - timedelta(6)

        expected_result = test_channel.creation_time.strftime("on %A")
        self.assertEqual(test_channel._get_day_of_creation(), expected_result)
        self.assertIn(expected_result.split()[1], self.day_names)

    def test_get_day_of_creation_from_7_days_back(self):
        """should return the correct format without year if the creation date 
        was at least a week before the current date
        """
        test_channel = Channel("Cream", "Strange Brew")
        test_channel.creation_time = datetime.today() - timedelta(7)

        #WARNING! in the first week of the year this case is not tested
        if test_channel.creation_time.year == datetime.today().year:
            expected_result = test_channel.creation_time.strftime(
                "on %A, %#d %b")
        else:
            expected_result = test_channel.creation_time.strftime(
                "on %A, %#d %b %Y")

        self.assertEqual(test_channel._get_day_of_creation(), expected_result)

    def test_get_day_of_creation_more_than_a_year_ago(self):
        """should return the correct format with year if the creation date was
       more than a year before the current date"""
        test_channel = Channel("Cream", "Strange Brew")
        test_channel.creation_time = datetime.fromisoformat("2017-12-22")

        self.assertEqual(test_channel._get_day_of_creation(), 
                         "on Friday, 22 Dec 2017")

    """Tests for get_formatted_creation_time"""

    def test_get_formatted_creation_time_today_0_02(self):
        """should return the correct formatted creation time when creation was
        today"""
        test_channel = Channel("The Well-dressed Guitar", "Steve Morse")
        test_channel.creation_time = datetime.today().replace(hour=0, minute=2)

        self.assertEqual(test_channel._get_formatted_creation_time(),
                         "today at 0:02")    
        
    def test_get_formatted_creation_time_yesterday_9_35(self):
        """should return the correct formatted creation time when creation was
        yesterday"""
        test_channel = Channel("The Well-dressed Guitar", "Steve Morse")
        test_channel.creation_time = (datetime.today() - 
            timedelta(1)).replace(hour=9, minute=35)

        self.assertEqual(test_channel._get_formatted_creation_time(),
                         "yesterday at 9:35")
        
    def test_get_formatted_creation_time_6_days_ago(self):
        """should return the correct formatted creation time when creation was
        a week ago at 14:30"""
        test_channel = Channel("The Well-dressed Guitar", "Steve Morse")
        test_channel.creation_time = (datetime.today() - 
            timedelta(6)).replace(hour=14, minute=30)

        #splitting up the result that came in an "on _dayname_, dd mon" format
        expected_result = test_channel._get_formatted_creation_time()
        on_prefix, result_without_prefix = expected_result.split(maxsplit=1)
        day_part, time_part = result_without_prefix.split(maxsplit=1)

        self.assertEqual(on_prefix, "on")           #checking the 'on' part
        self.assertIn(day_part, self.day_names)     #checking the day name part
        self.assertEqual(time_part, "at 14:30")     #checking the time part

    def test_get_formatted_creation_time_more_than_a_year_ago(self):
        """should return the correct formatted creation time when creation was
        at 10:02 on 22/12/2017"""
        test_channel = Channel("The Well-dressed Guitar", "Steve Morse")
        test_channel.creation_time = datetime.fromisoformat(
            "2017-12-22 10:02:00.000")

        self.assertEqual(test_channel._get_formatted_creation_time(),
                         "on Friday, 22 Dec 2017 at 10:02")    


    """Tests for Channel.serialilze()"""

    def test_channel_serialize(self):
        """serialize tests: fresh channel with no messages or participants
        (just the creator)"""
        data = {
          "new_channel_name": "a channel for idiots",
          "display_name_of_creator": "the king of all idiots"
        }
        self.channel_registry.add_new_channel_to_channels_list(data)
        channel = self.channel_registry.get_channel_list()[-1]
        channel_serialized = channel.serialize()

        current_time_hours = datetime.now().hour
        #use strftime with '%M' here for zero-padding!
        current_time_minutes = datetime.now().strftime("%M") 
        
        expected_result = {
            'channelName': "a channel for idiots",
            'creationTime': f'today at {current_time_hours}:{current_time_minutes}',
            'messages': [],
            'creatorDisplayName': "the king of all idiots",
            'participants': ["the king of all idiots"]
        }

        self.assertEqual(expected_result, channel_serialized)

if __name__ == "__main__":
    unittest.main()