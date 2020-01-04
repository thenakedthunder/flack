const NEW_CHANNEL_INPUT_DIALOG_ID = '#channelname-input-dialog';
const CHANNEL_NAME_INPUT_DEFAULT_LABEL = 'Channel Name'


before(function () {

	cy.visit('http://127.0.0.1:5000/')
	cy.get('#displayname-input').type('P.I.M.P.')
	cy.get('#display-name-ok-btn').click()

})






describe('Dialog displayed', function () {
	it('tests that the dialog is displayed after clicking on "Add new channel"',
		function () {

			cy.get('#add-new-channel-btn').click()
			cy.get(NEW_CHANNEL_INPUT_DIALOG_ID).should('exist');
			cy.get(NEW_CHANNEL_INPUT_DIALOG_ID).should('have.class', 'fade-in')

		})
})

describe('Assert input label', function () {
	it('Assert that the right label is shown above the input field',
        function () {

        	cy.get('.MuiInputLabel-root').should(
                'have.text', CHANNEL_NAME_INPUT_DEFAULT_LABEL)

        })
})

describe('Button disabled when input empty', function () {
	it('Tests that button is disabled when the input field is empty',
        function () {
        	// there was no display name stored in local storage, so text input
        	// should be empty and the button disabled
        	cy.get(INPUT_ID).should('have.value', '')
        	cy.get(SUBMIT_BUTTON_ID).should('be.disabled')
        })
})

describe('Input change handling', function () {
	it('Checks if functioning of the controlled element is correct',
        function () {
        	cy.get(INPUT_ID).type('Topper Harley')
        	cy.get(INPUT_ID).should('have.value', 'Topper Harley')
        })
})

describe('Input with leading whitespace', function () {
	it('Checks that submitting of a name with starting with a whitespace is not allowed',
        function () {
        	cy.get(INPUT_ID).clear().type(' ')
        	cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
        	cy.get(SUBMIT_BUTTON_ID).should('be.disabled')

        	// test it with some text after the whitespace too
        	cy.get(INPUT_ID).clear().type(' tökfej')
        	cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
        	cy.get(SUBMIT_BUTTON_ID).should('be.disabled')
        })
})

describe('Test valid input after error', function () {
	it('Tests that the error message disappears when the user starts to type a valid input',
        function () {
        	cy.get(INPUT_ID).clear().type('burnyák')
        	cy.assertNoErrorShown()
        	cy.get(SUBMIT_BUTTON_ID).should('not.be.disabled')
        })
})

describe('Input with trailing whitespace', function () {
	it('Checks that submitting of a name with trailing with a whitespace is not allowed',
        function () {
        	cy.get(INPUT_ID).clear().type('Anyaszomorító ')
        	cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
        	cy.get(SUBMIT_BUTTON_ID).should('be.disabled')
        })
})

describe('Delete trailing whitespace', function () {
	it('deletes whitespace to make input valid again and tests if the input is accepted',
        function () {
        	cy.get(INPUT_ID).type('{backspace}')
        	cy.assertNoErrorShown()
        	cy.get(SUBMIT_BUTTON_ID).should('not.be.disabled')
        })
})

describe('Input with empty string', function () {
	it('tests that empty string is not accepted as a valid display name',
        function () {
        	cy.get(INPUT_ID).clear()
        	cy.assertErrorFeedback(NO_STRING_PROVIDED_ERROR_MESSAGE)
        	cy.get(SUBMIT_BUTTON_ID).should('be.disabled')
        })
})