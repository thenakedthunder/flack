# selenium/test_prompt_display_name_modal.py


import unittest

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from test_helper import TestHelper

# Setting up tests
driver = webdriver.Chrome(ChromeDriverManager().install())
display_name_input_id = "displayname-input"


class Test_prompt_display_name_modal(unittest.TestCase):

    # ------------- DISPLAY NAME PROMPT MODAL TESTS -------------- #

    def __init__(self, methodName = 'runTest'):
        # for common test functions (e.g. asserts)
        self.test_helper = TestHelper(self, driver, display_name_input_id)
        return super().__init__(methodName)


    # tests that the page has loaded and its title 
    def test_display_name_modal_step1_title(self):
        
        driver.get("http://127.0.0.1:5000/")
        # clearing local storage
        driver.execute_script("window.localStorage.setItem('displayName','');")

        self.assertEqual(driver.title, "Flack")

        # since there was no display name stored in local storage
        self.test_helper.assert_text_input_value("")


    # empty string should not be submitted as a valid display name
    def test_display_name_modal_step2_empty_string_in_input_field(self):
        self.test_helper.submit_value("", "display-name-ok-btn")
        self.test_helper.check_error_feedback("Please provide a display name.")
        
        # asserts that the input modal is still visible
        self.test_helper.assert_that_input_modal_is_visible(True)


    # string with leading whitespaces should not be submitted as a valid 
    # display name
    def test_display_name_modal_step3_input_with_leading_whitespace(self):
        # when user starts to type a new input, the error message should 
        # disappear
        self.test_helper.input_new_value(" ")
        self.test_helper.assert_that_no_error_message_is_displayed()

        self.test_helper.submit_value(" tökfej", "display-name-ok-btn")
        self.test_helper.check_error_feedback(
            "The name cannot start or end with whitespaces.")
 
        # asserts that the input modal is still visible
        self.test_helper.assert_that_input_modal_is_visible(True)

    # string with trailing whitespaces should not be submitted as a valid 
    # display name
    def test_display_name_modal_step4_input_with_trailing_whitespace(self):
        # when user starts to type a new input, the error message should 
        # disappear
        self.test_helper.input_new_value("a")
        self.test_helper.assert_that_no_error_message_is_displayed()

        self.test_helper.submit_value("anyaszomorító ", "display-name-ok-btn")
        self.test_helper.check_error_feedback(
            "The name cannot start or end with whitespaces.")

        # asserts that the input modal is still visible
        self.test_helper.assert_that_input_modal_is_visible(True)

    # test with a valid display name input
    def test_display_name_modal_step5_valid_input(self):
        self.test_helper.input_new_value("burnyák")
        self.test_helper.assert_that_no_error_message_is_displayed()

        self.test_helper.submit_value("tirpák13", "display-name-ok-btn")
        self.test_helper.assert_that_no_error_message_is_displayed()

        # asserts that the input modal is closed
        self.test_helper.assert_that_input_modal_is_visible(False)

    # test that display name is stored from the previous session (test5) and
    # input to the display name input field - uses
    def test_display_name_modal_step6_display_name_stored_and_prefilled(self):
        #reload page and get the text in the input field
        driver.get("http://127.0.0.1:5000/")
        self.test_helper.assert_text_input_value("tirpák13")
        
        # ...and the same functions as before still have to work
        driver.find_element_by_id("display-name-ok-btn").click()
        self.test_helper.assert_that_no_error_message_is_displayed()
        self.test_helper.assert_that_input_modal_is_visible(False)



if __name__ == "__main__":
    unittest.main()