##FILE :selenium/test_prompt_channel_name_modal.py

#import time
#import unittest

#from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager

#from test_helper import TestHelper

## Setting up tests
#driver = webdriver.Chrome(ChromeDriverManager().install())
#channel_name_input_id = "new-channel-input"

#driver.get("http://127.0.0.1:5000/")


#class Test_prompt_channel_name_modal(unittest.TestCase):

#    def __init__(self, methodName = 'runTest'):
#        # for common test functions (e.g. asserts)
#        self.test_helper = TestHelper(self, driver, channel_name_input_id)
#        return super().__init__(methodName)

#    @classmethod
#    def setUpClass(cls):
#        # Get the display name prompt out of the way (it is tested in another
#        # class)
#        TestHelper.setup_with_new_displayname(driver)


#    # ------------- NEW CHANNEL NAME PROMPT MODAL TESTS -------------- #

#    def test_new_channel_modal_step1_modal_displayed(self):
#        self.test_helper.click_on_add_new_channel()

#    # empty string should not be submitted as a valid channel name
#    def test_new_channel_modal_step2_empty_string_in_input_field(self):
#        self.test_helper.submit_value("", "create-channel-btn")
#        self.test_helper.check_error_feedback(
#            "Please provide a channel name.")
        
#        # asserts that the input modal is still visible
#        self.test_helper.assert_that_input_modal_is_visible(True)

#    # string with leading whitespaces should not be submitted as a valid 
#    # channel name
#    def test_new_channel_modal_step3_input_with_leading_whitespace(self):
#        # when user starts to type a new input, the error message should 
#        # disappear
#        self.test_helper.input_new_value(" ")
#        self.test_helper.assert_that_no_error_message_is_displayed()

#        self.test_helper.submit_value(" Degecfalva", "create-channel-btn")
#        self.test_helper.check_error_feedback(
#            "The name cannot start or end with whitespaces.")
 
#        # asserts that the input modal is still visible
#        self.test_helper.assert_that_input_modal_is_visible(True)

#    # string with trailing whitespaces should not be submitted as a valid 
#    # channel name
#    def test_new_channel_modal_step4_input_with_trailing_whitespace(self):
#        # when user starts to type a new input, the error message should 
#        # disappear
#        self.test_helper.input_new_value("a")
#        self.test_helper.assert_that_no_error_message_is_displayed()

#        self.test_helper.submit_value("bar�zdabilleget�k ", 
#                                      "create-channel-btn")
#        self.test_helper.check_error_feedback(
#            "The name cannot start or end with whitespaces.")

#        # asserts that the input modal is still visible
#        self.test_helper.assert_that_input_modal_is_visible(True)

#    # test with a valid channel name input
#    def test_new_channel_modal_step5_valid_input(self):
#        self.test_helper.input_new_value("t")
#        self.test_helper.assert_that_no_error_message_is_displayed()

#        self.test_helper.submit_value("pacalarcúak", "create-channel-btn")
#        self.test_helper.assert_that_no_error_message_is_displayed()

#        # asserts that the input modal is closed
#        self.test_helper.assert_that_input_modal_is_visible(False)

#    # test that the same channel name is not accepted twice
#    def test_new_channel_modal_step6_same_input_again(self):
#        self.test_helper.click_on_add_new_channel()

#        # should not matter if chars are lower or upper case
#        self.test_helper.submit_value("PacalArcúak", "create-channel-btn")
#        self.test_helper.check_error_feedback("Sorry, this channelname is " +
#                                "already in use. Please choose another one.")

#        # asserts that the input modal is still visible
#        self.test_helper.assert_that_input_modal_is_visible(True)
