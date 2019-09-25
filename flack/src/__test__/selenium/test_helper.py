# selenium/test_helper.py


import time
from unittest import TestCase

from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys


class TestHelper(object):
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get("http://127.0.0.1:5000/")
    
    
    def __init__(self, test_case, input_id=None, dialog_id=None):
        self.test_case = test_case
        self.input_id = input_id
        self.dialog_id = dialog_id


    def assert_text_input_value(self, expected_value):
        """ uses the pre-stored text input id to assert that its value is as 
            expected
        """
        text_in_input = TestHelper.driver.find_element_by_id(
            self.input_id).get_attribute('value')
        self.test_case.assertEqual(text_in_input, expected_value)

    def submit_value(self, input_value, btn_id):
        """ gets input field and puts in the input value
        """
        self.input_new_value(input_value)

        # clicks the submit button
        time.sleep(1)           # otherwise the button is not always found
        btn = TestHelper.driver.find_element_by_id(btn_id)
        btn.click()
    
    def input_new_value(self, input_value):
        # clear input (WebElement's clear method did not work)
        script = f'document.querySelector("#{self.input_id}").value = ""'
        TestHelper.driver.execute_script(script)

        input_field = TestHelper.driver.find_element_by_id(self.input_id)
        input_field.send_keys(input_value)

    def assert_error_feedback_given(self, expected, label_text):
        """ checks if an error is shown and if the error message is correct
        """
        # first check if input base has the error formatting
        error_message_div = TestHelper.driver.find_element_by_css_selector(
            ".MuiInputBase-root")
        has_error_formatting = "Mui-error" in error_message_div.get_attribute(
            "class")

        self.test_case.assertEqual(has_error_formatting, expected)

        # then check if error message is provided and its error formatting
        label_div = TestHelper.driver.find_element_by_css_selector(
            ".MuiInputLabel-root")
        has_error_formatting = "Mui-error" in label_div.get_attribute("class")

        self.test_case.assertEqual(has_error_formatting, expected)
        self.test_case.assertEqual(label_div.text, label_text)

    def is_btn_disabled(self, expected):
        btn = TestHelper.driver.find_element_by_id("display-name-ok-btn")
        actual = btn.get_attribute("disabled") != None

        self.test_case.assertEqual(actual, expected)

    def delete_text(self):
        input_field = TestHelper.driver.find_element_by_id(self.input_id)
        while len(input_field.get_attribute('value')) != 0:
            input_field.send_keys(Keys.BACKSPACE)

    def assert_that_dialog_is_not_visible(self):
        """ asserts that modal is not visible
        """
        time.sleep(3)
        with self.test_case.assertRaises(NoSuchElementException):
            TestHelper.driver.find_element_by_id(self.dialog_id)

    #def assert_that_no_error_message_is_displayed(self):
    #    with self.test_case.assertRaises(NoSuchElementException):
    #        TestHelper.driver.find_element_by_class_name("error-message")

    #    # border color of text input should be normal (not red)
    #    self.check_border_color_of_textinput("rgb(0, 0, 0)")
    
    #def check_border_color_of_textinput(self, expected_color):
    #    display_name_input_field = TestHelper.driver.find_element_by_id(
    #        self.input_id)
    #    text_input_border = display_name_input_field.value_of_css_property(
    #        "border-color")
    #    self.test_case.assertEqual(text_input_border, expected_color)



    #def click_on_add_new_channel(self):
    #    """ the channel creation modal is opened when "Add new channel" is 
    #        clicked
    #    """
    #    new_channel_link = TestHelper.driver.find_element_by_id(
    #        "add-new-channel-surface")
    #    new_channel_link.click()
        
    #    self.assert_that_input_modal_is_visible(True)
    #    # the text input should always be empty upon the modal opening
    #    self.assert_text_input_value("")
    

    #@staticmethod
    #def setup_with_new_displayname():
    #    """ Sets the application up for tests. 'execute_script' functions had
    #        to be called as a workaround because issues with the webdriver ones
    #    """
    #    TestHelper.driver.execute_script(
    #        "document.querySelector('#displayname-input').value = 'gecó'")
        
    #    # clicks the "Use this name" button
    #    time.sleep(1)           # otherwise the button is not always found
    #    TestHelper.driver.execute_script(
    #        "document.querySelector('#display-name-ok-btn').click()")

    #@staticmethod
    #def create_new_channel(channel_name):
    #    new_channel_link = TestHelper.driver.find_element_by_id(
    #        "add-new-channel-surface")
    #    new_channel_link.click()
        
    #    input_field = TestHelper.driver.find_element_by_id("new-channel-input")
    #    input_field.send_keys(channel_name)
        
    #    time.sleep(1)           # otherwise the button is not always found
    #    # a workaround again, because of the "special" way webhelper functions
    #    # are working
    #    TestHelper.driver.execute_script(
    #        "document.querySelector('#create-channel-btn').click()")