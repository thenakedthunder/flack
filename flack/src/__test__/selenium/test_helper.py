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
        if input_id is not None:
            self.input_id = input_id
        if dialog_id is not None:
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

        # then check if (and what) error message is provided and its formatting
        try:
            label_div = TestHelper.driver.find_element_by_css_selector(
                ".MuiInputLabel-root")
            self.test_case.assertEqual(label_div.text, label_text)
            has_error_formatting = "Mui-error" in label_div.get_attribute(
                "class")

        except:         # this means no label was found
            has_error_formatting = False;

        self.test_case.assertEqual(has_error_formatting, expected)

    def is_btn_disabled(self, expected, selector):
        btn = TestHelper.driver.find_element_by_css_selector(selector)
        actual = btn.get_attribute("disabled") != None

        self.test_case.assertEqual(actual, expected)

    def delete_text(self):
        input_field = TestHelper.driver.find_element_by_id(self.input_id)
        while len(input_field.get_attribute('value')) != 0:
            input_field.send_keys(Keys.BACKSPACE)

    def assert_that_dialog_is_visible(self, is_visible=True):
        """ assertion of the visibility of dialog
        """
        time.sleep(1)

        try:
            dialog = TestHelper.driver.find_element_by_id(self.dialog_id)
            self.test_case.assertEqual(is_visible, True)

        except NoSuchElementException:
            self.test_case.assertEqual(is_visible, False)

    def assert_animation_is_correct(self, element, class_for_animation):
        """ checks the name of the class that is responsible for the desired
            animation
        """
        self.test_case.assertTrue(
            class_for_animation in element.get_attribute("class"))

    def click_on_add_new_channel(self):
        """ the channel creation dialog is opened when "Add new channel" is 
            clicked
        """
        new_channel_link = TestHelper.driver.find_element_by_id(
            "add-new-channel-btn")
        new_channel_link.click()
        
        self.assert_that_dialog_is_visible(True)

    def check_if_an_error_is_found(self, is_error_expected, 
                                 input_label_value_expected):
        self.assert_error_feedback_given(is_error_expected, 
            input_label_value_expected) 
        self.is_btn_disabled(is_error_expected, ".submit-btn")

    def test_cancel_btn_with_input(self, input):
        self.click_on_add_new_channel()
        self.input_new_value(input)
        time.sleep(1)
        
        # when the dialog is closed in the meantime, webdriver loses the 
        # reference here, so this button always has to be (re)searched
        button = self.driver.find_element_by_class_name("cancel-btn")
        button.click()
        self.assert_that_dialog_is_visible(False)

    def add_new_channel(self, value_to_submit, btn_selector):
        self.click_on_add_new_channel()
        self.submit_value(value_to_submit, btn_selector)


    # ---------- STATIC METHODS ----------

    @staticmethod
    def setup_with_new_displayname():
        """ Sets the application up for tests. 'execute_script' functions had
            to be called as a workaround because issues with the webdriver ones
        """
        time.sleep(5)
        text_input = TestHelper.driver.find_element_by_id("displayname-input")
        text_input.send_keys("gecó")
        
        # clicks the "Use this name" button
        time.sleep(1)           # otherwise the button is not always found
        TestHelper.driver.execute_script(
            "document.querySelector('#display-name-ok-btn').click()")

