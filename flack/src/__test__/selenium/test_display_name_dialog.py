# selenium/test_display_name_dialog.py


import time
import unittest
from test_helper import TestHelper

from selenium.webdriver.common.keys import Keys



# --------------- "CONSTANTS" ---------------

DISPLAYNAME_INPUT_DEFAULT_LABEL = "Your Display Name"
WHITESPACE_AT_START_OR_END_ERROR_MESSAGE = "The name cannot start or end with whitespaces."
NO_STRING_PROVIDED_ERROR_MESSAGE = "Please provide a display name."


class Test_display_name_dialog(unittest.TestCase):

    def __init__(self, methodName = 'runTest'):
        # for common test functions (e.g. asserts)
        self.test_helper = TestHelper(self, "displayname-input", 
                                      "displayname-input-dialog")
        self.driver = self.test_helper.driver

        return super().__init__(methodName)
        

    def test_display_name_dialog_step1_title(self):
        """ tests that the page has loaded by its title 
        """
        # test first with "no" displayName saved
        self.driver.execute_script(
            "window.localStorage.setItem('displayName','');")
        self.driver.get("http://127.0.0.1:5000/")       # load page

        self.assertEqual(self.driver.title, "Flack")

    def test_display_name_dialog_step2_input_change_handling(self):
        """ tests that input change is handled well
        """
        # since there was no display name stored in local storage, text input
        # should be empty
        self.test_helper.assert_text_input_value("")

        # this is needed because this field is a controlled element
        self.test_helper.input_new_value("Topper Harley")
        time.sleep(1)
        self.test_helper.assert_text_input_value("Topper Harley")

    def test_display_name_dialog_step3_input_with_leading_whitespace(self):
        """ string with leading whitespaces should not be accepted as a valid 
            display name
        """
        # when user starts to type a new input, the error message should appear
        # when applicable
        self.test_helper.input_new_value(" ")
        time.sleep(1)

        self.__check_if_an_error_is_found(True, input_label_value_expected= 
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
                
        # test it with some text after whitespace too
        self.test_helper.input_new_value(" tökfej")
        time.sleep(1)
        
        self.__check_if_an_error_is_found(True, input_label_value_expected=
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
                
    def test_display_name_dialog_step4_valid_input_after_error(self):
        """ when user starts to type a new input, the error message should 
            disappear (if there was one and IF the new input is valid)
        """
        self.test_helper.input_new_value("burnyák")
        time.sleep(1)
        
        self.__check_if_an_error_is_found(False)
       
    def test_display_name_dialog_step5_input_with_trailing_whitespace(self):
        """ string with trailing whitespaces should not be accepted as a valid 
            display name
        """
        self.test_helper.input_new_value("Anyaszomorító ")
        time.sleep(1)
        
        self.__check_if_an_error_is_found(True, input_label_value_expected=
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)

    def test_display_name_dialog_step6_delete_chars_to_test_with_valid_input(self):
        """ input should be valid again after deleting the trailing whitespace
        """
        text_field = self.driver.find_element_by_id(self.test_helper.input_id)
        text_field.send_keys(Keys.BACKSPACE)
        time.sleep(1)
    
        self.__check_if_an_error_is_found(False)

    def test_display_name_dialog_step7_input_with_empty_string(self):
        """ empty string should not be accepted as a valid display name
        """
        self.test_helper.delete_text()      # clear text input
        time.sleep(1)
        
        self.__check_if_an_error_is_found(True,
            input_label_value_expected=
            NO_STRING_PROVIDED_ERROR_MESSAGE)

    def test_display_name_dialog_step8_submit(self):
        """ test again that valid input does not result in an error message,
            and then check the functioning of submitting
        """
        self.test_helper.input_new_value("tirpák")
        time.sleep(1)
        self.__check_if_an_error_is_found(False)

        self.test_helper.submit_value("tirpák13", "display-name-ok-btn")
        dialog = self.driver.find_element_by_id(self.test_helper.dialog_id)
        # assert animation
        self.assertTrue("hide" in dialog.get_attribute("class"))

        time.sleep(1)
        self.test_helper.assert_that_dialog_is_not_visible()

    def test_display_name_dialog_step9_input_prefilled_with_displayname(self):
        """ the display name should be cached if there was one submitted in a
            previous session. This stored value has to be filled in as a 
            display name suggested for the user.
        """
        display_name_stored = self.driver.execute_script(
            "return window.localStorage.getItem('displayName');")
        self.assertEqual(display_name_stored, "tirpák13")

        self.driver.get("http://127.0.0.1:5000/")       # refresh page
        self.test_helper.assert_text_input_value(display_name_stored)

    
    # --------------- private methods ---------------

    def __check_if_an_error_is_found(self, is_error_expected, 
                                 input_label_value_expected = 
                                 DISPLAYNAME_INPUT_DEFAULT_LABEL):
        self.test_helper.assert_error_feedback_given(is_error_expected, 
            input_label_value_expected) 
        self.test_helper.is_btn_disabled(is_error_expected)


if __name__ == "__main__":
    unittest.main()