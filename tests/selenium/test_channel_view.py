#FILE :selenium/test_channel_view.py

import unittest
import time

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from test_helper import TestHelper

# Setting up tests
driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get("http://127.0.0.1:5000/")


class Test_channel_view(unittest.TestCase):

    def __init__(self, methodName = 'runTest'):
        self.test_helper = TestHelper(self, driver)
        return super().__init__(methodName)

    @classmethod
    def create_new_channel(cls, channel_name):
        new_channel_link = driver.find_element_by_id("add-new-channel-surface")
        new_channel_link.click()
        
        input_field = driver.find_element_by_id("new-channel-input")
        input_field.send_keys(channel_name)
        
        time.sleep(1)           # otherwise the button is not always found
        btn = driver.find_element_by_id("create-channel-btn")
        btn.click()

    @classmethod
    def setUpClass(cls):
        # Get the display name prompt out of the way (it is tested in another
        # class)
        TestHelper.setup_with_new_displayname(driver)
        # and create a new channel
        cls.create_new_channel("Csepűrágó1")
        cls.create_new_channel("Csepűrágó2")


    # ------------------ CHANNEL VIEW TESTS ------------------- #

    def test_channel_step1_channel_name_displayed(self):
        open_channel_link = driver.find_element_by_id("channel-2")
        open_channel_link.click()

        channel_name_text = driver.find_element_by_id("channel-name").text
        self.assertEqual(channel_name_text, "Csepűrágó2") 

