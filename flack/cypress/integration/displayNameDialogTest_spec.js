const INPUT_ID = '#displayname-input';
const INPUT_DIALOG_ID = '#displayname-input-dialog';
const SUBMIT_BUTTON_ID = '#display-name-ok-btn'
const DISPLAYNAME_INPUT_DEFAULT_LABEL = "Your Display Name"
const WHITESPACE_AT_START_OR_END_ERROR_MESSAGE =
    'The name cannot start or end with whitespaces.'
const NO_STRING_PROVIDED_ERROR_MESSAGE = "Please provide a display name."



Cypress.Commands.add('assertErrorFeedback', (expectedErrorText) => {
    cy.get('.MuiInputBase-root').should('have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('have.text', expectedErrorText)
})

Cypress.Commands.add('assertNoErrorShown', () => {
    cy.get('.MuiInputBase-root').should('not.have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should('not.have.class', 'Mui-error')
    cy.get('.MuiInputLabel-root').should(
        'have.text', DISPLAYNAME_INPUT_DEFAULT_LABEL)
})



describe('Page Title Test', function () {
    it('tests that the page has loaded by its title', function () {
        cy.visit('http://127.0.0.1:5000/')

        cy.title().should('eq', 'Flack')
    })
})

describe('Assert animation class', function () {
    it('Assert animation of display name dialog', function () {
        cy.get(INPUT_DIALOG_ID).should('have.class', 'bounce-fade')
    })
})

describe('Assert input label', function () {
    it('Assert that the right label is shown above the input field',
        function () {
            cy.get('.MuiInputLabel-root').should(
                'have.text', DISPLAYNAME_INPUT_DEFAULT_LABEL)
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

            cy.assertNoErrorShown()
            cy.get(SUBMIT_BUTTON_ID).should('not.be.disabled');

        })
})

describe('Input with leading whitespace', function () {
    it('Checks that submitting of a name with a starting whitespace is not allowed',
        function () {

            cy.get(INPUT_ID).clear().type(' ')
            cy.assertErrorFeedback(WHITESPACE_AT_START_OR_END_ERROR_MESSAGE)
            cy.get(SUBMIT_BUTTON_ID).should('be.disabled')

            // test it with some text after the whitespace too
            cy.get(INPUT_ID).type('tökfej')
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
    it('Checks that submitting of a name with a trailing whitespace is not allowed',
        function () {
            cy.get(INPUT_ID).type(' ')
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

describe('Submit', function () {
    it('tests again that valid input is excepted, and then the submitting',
        function () {

            cy.get(INPUT_ID).clear().type('tirpák')
            cy.assertNoErrorShown()
            cy.get(SUBMIT_BUTTON_ID).should('not.be.disabled')

            cy.get(INPUT_ID).type('13')
            // The dialog should disappear after submitting
            cy.get(INPUT_DIALOG_ID).should('exist');
            cy.get(SUBMIT_BUTTON_ID).click()
            cy.get(INPUT_DIALOG_ID).should('not.exist');

        })
})

describe('Display name saved', function () {
    it('checks if the display name is cached from previous session and filled into the text input',
        function () {

            cy.visit('http://127.0.0.1:5000/')      // reload page
            cy.get(INPUT_ID).clear().type('Pernahajder')
            cy.get(SUBMIT_BUTTON_ID).click()

            cy.visit('http://127.0.0.1:5000/')      // reload page

            cy.window().then(window => {
                const displayNameStored = window.localStorage.getItem('displayName')
                expect(displayNameStored).to.eq('Pernahajder')
                cy.get(INPUT_ID).should('have.value', displayNameStored)

                cy.assertNoErrorShown()
                cy.get(SUBMIT_BUTTON_ID).should('not.be.disabled')
            });

        })
})