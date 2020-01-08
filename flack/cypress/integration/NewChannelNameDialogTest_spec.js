const NEW_CHANNEL_INPUT_DIALOG_ID = '#channelname-input-dialog';
const CHANNEL_NAME_INPUT_DEFAULT_LABEL = 'Channel Name'
const CHANNEL_NAME_INPUT_ID = '#channelname-input'
const SUBMIT_CHANNEL_NAME_BUTTON = '#channel-name-ok-btn'
const CANCEL_BUTTON = '#cancel-btn'
const WHITESPACE_AT_START_OR_END_ERROR_MESSAGE =
    'The name cannot start or end with whitespaces.'
const NO_STRING_PROVIDED_ERROR_MESSAGE = "Please provide a channel name."



before(function () {

	cy.visit('http://127.0.0.1:5000/')
	cy.get('#displayname-input').type('P.I.M.P.')
	cy.get('#display-name-ok-btn').click()

})

Cypress.Commands.add('assertNoErrorShown', () => {
    cy.get('.MuiInputBase-root').should('not.have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('not.have.class', 'Mui-error')
})

Cypress.Commands.add('assertErrorFeedback', (expectedErrorText) => {
    cy.get('.MuiInputBase-root').should('have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('have.text', expectedErrorText)
})



describe('Dialog displayed', function () {
	it('tests that the dialog is displayed after clicking on "Add new channel" and its animation class',
		function () {

			cy.get('#add-new-channel-btn').click()
			cy.get(NEW_CHANNEL_INPUT_DIALOG_ID).should('exist');
			cy.get(NEW_CHANNEL_INPUT_DIALOG_ID).should('have.class', 'fade-in')

		})
})

describe('Assert correct default look of dialog', function () {
    it('checks the label, error styling (none should be here) and the disabled state of buttons in the default state (when input field is empty)',
        function () {

            cy.get('.MuiInputLabel-root').should(
                'have.text', CHANNEL_NAME_INPUT_DEFAULT_LABEL)
            cy.get(CHANNEL_NAME_INPUT_ID).should('have.value', '')
            cy.assertNoErrorShown()

            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Input change handling', function () {
	it('Checks if functioning of the controlled element is correct',
        function () {

        	cy.get(CHANNEL_NAME_INPUT_ID).type('Degecfalva')
        	cy.get(CHANNEL_NAME_INPUT_ID).should('have.value', 'Degecfalva')

            cy.get('.MuiInputLabel-root').should(
                'have.text', CHANNEL_NAME_INPUT_DEFAULT_LABEL)
            cy.assertNoErrorShown()
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('not.be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Input with leading whitespace', function () {
	it('Checks that submitting of a name with starting with a whitespace is not allowed',
        function () {

        	cy.get(CHANNEL_NAME_INPUT_ID).clear().type(' ')
            cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('be.disabled')

        	// test it with some text after the whitespace too
            cy.get(CHANNEL_NAME_INPUT_ID).type('Barázdabillegetõk')
        	cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Test valid input after error', function () {
	it('Tests that the error message disappears when the user starts to type a valid input',
        function () {

            cy.get(CHANNEL_NAME_INPUT_ID).type('{moveToStart}')
            cy.get(CHANNEL_NAME_INPUT_ID).type('{del}')

            cy.assertNoErrorShown()
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('not.be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Input with trailing whitespace', function () {
	it('Checks that submitting of a name with trailing with a whitespace is not allowed',
        function () {

            cy.get(CHANNEL_NAME_INPUT_ID).type('{moveToEnd}')
            cy.get(CHANNEL_NAME_INPUT_ID).type(' ')

        	cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Delete trailing whitespace', function () {
	it('deletes whitespace to make input valid again and tests if the input is accepted',
        function () {

        	cy.get(CHANNEL_NAME_INPUT_ID).type('{backspace}')

            cy.assertNoErrorShown()
        	cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('not.be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})

describe('Input with empty string', function () {
	it('tests that empty string is not accepted as a valid display name',
        function () {

            cy.get(CHANNEL_NAME_INPUT_ID).clear()

        	cy.assertErrorFeedback(NO_STRING_PROVIDED_ERROR_MESSAGE)
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).should('be.disabled')
            cy.get(CANCEL_BUTTON).should('not.be.disabled')

        })
})