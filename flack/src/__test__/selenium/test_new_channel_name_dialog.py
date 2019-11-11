# selenium/test_new_channel_name_dialog.py


import time
import unittest
from test_helper import TestHelper

from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException



# --------------- "CONSTANTS" --------------- #

CHANNEL_NAME_INPUT_DEFAULT_LABEL = "Channel Name"
WHITESPACE_AT_START_OR_END_ERROR_MESSAGE = "The name cannot start or end with whitespaces."
NO_STRING_PROVIDED_ERROR_MESSAGE = "Please provide a channel name."
CHANNEL_NAME_TAKEN = "Sorry, this name is already used. Please choose another one."


class Test_new_channel_name_dialog(unittest.TestCase):

    def __init__(self, methodName = 'runTest'):
        # for common test functions (e.g. asserts)
        self.test_helper = TestHelper(self, "channelname-input", 
                                      "channelname-input-dialog")
        self.driver = self.test_helper.driver

        return super().__init__(methodName)

    @classmethod
    def setUpClass(cls):
        """ Get the display name prompt out of the way 
            (it is tested in test_display_name_dialog.py)
        """
        TestHelper.setup_with_new_displayname()
        time.sleep(3)


# ------------- NEW CHANNEL NAME DIALOG TESTS -------------- #

    def test_new_channel_dialog_step_a_dialog_displayed(self):
        """ tests that the "Add new channel" button is working
        """
        self.test_helper.click_on_add_new_channel()

        dialog = self.driver.find_element_by_id(self.test_helper.dialog_id)
        self.test_helper.assert_animation_is_correct(dialog, "fade-in")


    def test_new_channel_dialog_step_b_input_change_handling(self):
        """ tests that input change is handled well
        """
        # this text input should be empty by default
        self.test_helper.assert_text_input_value("")

        # this is needed because this field is a controlled element
        self.test_helper.input_new_value("Degecfalva")
        time.sleep(1)
        self.test_helper.assert_text_input_value("Degecfalva")

    def test_new_channel_dialog_step_c_input_with_leading_whitespace(self):
        """ string with leading whitespaces should not be accepted as a valid 
            channel name
        """
        # when user starts to type a new input, the error message should appear
        # when applicable
        self.test_helper.input_new_value(" ")
        time.sleep(1)

        self.test_helper.check_if_an_error_is_found(True,
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
                
        # test it with some text after the whitespace too
        self.test_helper.input_new_value(" barázdabillegetők")
        time.sleep(1)
        
        self.test_helper.check_if_an_error_is_found(True,
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
                
    def test_new_channel_dialog_step_d_valid_input_after_error(self):
        """ when user starts to type a new input, the error message should 
            disappear (if there was one and IF the new input is valid)
        """
        self.test_helper.input_new_value("Pacalarcúak")
        time.sleep(1)
        
        self.test_helper.check_if_an_error_is_found(False, 
                            CHANNEL_NAME_INPUT_DEFAULT_LABEL)
       
    def test_new_channel_dialog_step_e_input_with_trailing_whitespace(self):
        """ string with trailing whitespaces should not be accepted as a valid 
            channel name
        """
        self.test_helper.input_new_value("Anyaszomorítók ")
        time.sleep(1)
        
        self.test_helper.check_if_an_error_is_found(True,
            WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)

    def test_new_channel_dialog_step_f_delete_chars_to_test_with_valid_input(self):
        """ input should be valid again after deleting the trailing whitespace
        """
        text_field = self.driver.find_element_by_id(self.test_helper.input_id)
        text_field.send_keys(Keys.BACKSPACE)
        time.sleep(1)
    
        self.test_helper.check_if_an_error_is_found(False, 
                            CHANNEL_NAME_INPUT_DEFAULT_LABEL)

    def test_new_channel_dialog_step_g_input_with_empty_string(self):
        """ empty string should not be accepted as a valid channel name
        """
        self.test_helper.delete_text()      # clear text input
        time.sleep(1)
        
        self.test_helper.check_if_an_error_is_found(True, 
                            NO_STRING_PROVIDED_ERROR_MESSAGE)

    def test_new_channel_dialog_step_h_submit(self):
        """ test again that valid input does not result in an error message,
            and then check the functioning of submitting
        """
        self.test_helper.input_new_value("Channel Zero")
        time.sleep(1)
        self.test_helper.check_if_an_error_is_found(False, 
                            CHANNEL_NAME_INPUT_DEFAULT_LABEL)

        self.test_helper.submit_value("Purpendicular", "channel-name-ok-btn")
        dialog = self.driver.find_element_by_id(self.test_helper.dialog_id)
        self.test_helper.assert_animation_is_correct(dialog, "fade-out")

        time.sleep(1)       # so the animation is ended, the dialog is hidden
        self.test_helper.assert_that_dialog_is_visible(False)

    def test_new_channel_dialog_step_i_cancel(self):
        """ this dialog has a cancel button that should close the dialog
            (with no animation)
        """
        self.test_helper.test_cancel_btn_with_input("")
        self.test_helper.test_cancel_btn_with_input("channel_name")
        self.test_helper.test_cancel_btn_with_input(
            " channel_name_starting_with_whitespace")

    def test_new_channel_dialog_step_j_channel_creation(self):
        """ tests the creation of new channels
        """
        new_element = self.driver.find_element_by_css_selector("#channel-1")
        self.test_helper.test_case.assertEqual(new_element.text, 
                                               "Purpendicular")

        time.sleep(1)
        self.test_helper.add_new_channel("Total A.band.on", 
                                         "channel-name-ok-btn")
        time.sleep(1)
        new_element = self.driver.find_element_by_css_selector("#channel-2")
        self.test_helper.test_case.assertEqual(new_element.text, 
                                               "Total A.band.on")

    def test_new_channel_dialog_step_k_channel_creation_with_an_already_used_name(self):
        """ Negative test: it should not be possible to create a channel with
            a name already used.
        """
        time.sleep(1)
        self.test_helper.add_new_channel("purpendicular", 
                                         "channel-name-ok-btn")
        time.sleep(1)
        self.test_helper.check_if_an_error_is_found(True, CHANNEL_NAME_TAKEN)
        
        button = self.driver.find_element_by_class_name("cancel-btn")
        button.click()
        time.sleep(1)
        with self.assertRaises(NoSuchElementException):
            self.driver.find_element_by_css_selector("#channel-3")


if __name__ == "__main__":
    unittest.main()