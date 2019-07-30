# selenium/test_helper.py


import time
from unittest import TestCase

from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


class TestHelper(object):
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get("http://127.0.0.1:5000/")
    
    
    def __init__(self, test_case, input_id=None, modal_id=None):
        self.test_case = test_case
        self.input_id = input_id
        self.modal_id = modal_id


    def assert_text_input_value(self, expected_value):
        """ the displayname is saved from the previous session. If there was
            none stored, there shouldn't be any name pre-filled in input
        """
        text_in_input = TestHelper.driver.find_element_by_id(
            self.input_id).get_attribute('value')
        self.test_case.assertEqual(text_in_input, expected_value)

    def submit_value(self, input_value, btn_id):
        # gets input field and puts in the input value
        self.input_new_value(input_value)

        # clicks the "Use this name" button
        time.sleep(1)           # otherwise the button is not always found
        btn = TestHelper.driver.find_element_by_id(btn_id)
        btn.click()
    
    def input_new_value(self, input_value):
        input_field = TestHelper.driver.find_element_by_id(self.input_id)
        input_field.clear()
        input_field.send_keys(input_value)

    def check_error_feedback(self, error_message):
        """ checks if the error message is displayed and if it is correct
            for that, we need the error message right below the input field
        """
        error_message_selector = "#" + self.input_id + " + .error-message"
        error_message_div = TestHelper.driver.find_element_by_css_selector(
            error_message_selector)

        self.test_case.assertEqual(error_message_div.text, error_message)

        # the error message should be written in red
        error_message_text_color = error_message_div.value_of_css_property(
            "color")
        self.test_case.assertEqual(error_message_text_color,
                                  "rgba(255, 0, 0, 1)")
         
        # and the input field should have a red border
        self.check_border_color_of_textinput("rgb(220, 53, 69)")

    def assert_that_no_error_message_is_displayed(self):
        """ asserts that no error message is displayed
        """
        with self.test_case.assertRaises(NoSuchElementException):
            TestHelper.driver.find_element_by_class_name("error-message")

        # border color of text input should be normal (not red)
        self.check_border_color_of_textinput("rgb(0, 0, 0)")
    
    def check_border_color_of_textinput(self, expected_color):
        display_name_input_field = TestHelper.driver.find_element_by_id(
            self.input_id)
        text_input_border = display_name_input_field.value_of_css_property(
            "border-color")
        self.test_case.assertEqual(text_input_border, expected_color)

    def assert_that_input_modal_is_visible(self, expected):
        """ asserts that modal is visible
        """
        time.sleep(3)
        self.test_case.assertEqual(TestHelper.driver.find_element_by_id(
            self.modal_id).is_displayed(), expected)

    def click_on_add_new_channel(self):
        """ the channel creation modal is opened when "Add new channel" is 
            clicked
        """
        new_channel_link = TestHelper.driver.find_element_by_id(
            "add-new-channel-surface")
        new_channel_link.click()
        
        self.assert_that_input_modal_is_visible(True)
        # the text input should always be empty upon the modal opening
        self.assert_text_input_value("")
    

    @staticmethod
    def setup_with_new_displayname():
        """ Sets the application up for tests. 'execute_script' functions had
            to be called as a workaround because issues with the webdriver ones
        """
        TestHelper.driver.execute_script(
            "document.querySelector('#displayname-input').value = 'gecó'")
        
        # clicks the "Use this name" button
        time.sleep(1)           # otherwise the button is not always found
        TestHelper.driver.execute_script(
            "document.querySelector('#display-name-ok-btn').click()")

    @staticmethod
    def create_new_channel(channel_name):
        new_channel_link = TestHelper.driver.find_element_by_id(
            "add-new-channel-surface")
        new_channel_link.click()
        
        input_field = TestHelper.driver.find_element_by_id("new-channel-input")
        input_field.send_keys(channel_name)
        
        time.sleep(1)           # otherwise the button is not always found
        # a workaround again, because of the "special" way webhelper functions
        # are working
        TestHelper.driver.execute_script(
            "document.querySelector('#create-channel-btn').click()")