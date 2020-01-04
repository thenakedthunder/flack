#FILE :selenium/test_channel_view.py

import unittest
import time
from test_helper import TestHelper


class Test_channel_view(unittest.TestCase):

    def __init__(self, methodName = 'runTest'):
        # for common test functions (e.g. asserts)
        self.test_helper = TestHelper(self)
        self.driver = self.test_helper.driver
        return super().__init__(methodName)


    @classmethod
    def setUpClass(cls):
        """Get the display name prompt out of the way 
        (it is tested in another class)
        """
        print("1 mi a kurva isten van ezzel a fos webdriverrel")
        TestHelper.setup_with_new_displayname()
        print("2")
        time.sleep(3)
        # and create new channels
        TestHelper.create_new_channel("Csepűrágó1")
        time.sleep(1)
        TestHelper.create_new_channel("Csepűrágó2")


    # ------------------ CHANNEL VIEW TESTS ------------------- #

    def test_channel_name_displayed(self):
        print("mi a kurva isten van ezzel a fos webdriverrel")
        driver = self.driver
        open_channel_link = driver.find_element_by_id("channel-2")
        open_channel_link.click()

        channel_name_text = driver.find_element_by_id("channel-name").text
        self.assertEqual(channel_name_text, "Csepűrágó2") 

