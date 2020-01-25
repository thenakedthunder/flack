const CHANNEL_NAME_INPUT_ID = '#channelname-input'
const SUBMIT_CHANNEL_NAME_BUTTON = '#channel-name-ok-btn'
const CANCEL_BUTTON = '#cancel-btn'




before(function () {

    cy.visit('http://127.0.0.1:5000/')
    cy.get('#displayname-input').type('P.I.M.P.')
    cy.get('#display-name-ok-btn').click()

})

describe('New channel displayed in list', function () {
    it('tests that the new channel created appears in the channel list',
        function () {

            cy.get('#add-new-channel-btn').click()
            cy.get(CHANNEL_NAME_INPUT_ID).type('Bumburnyákok')
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).click()

            cy.get('#channel-0').should('have.text', 'Bumburnyákok')

        })

})

describe('New channel not added when dialog cancelled', function () {
    it('tests that the list does not show anything new when the "New Channel Dialog" is cancelled',
        function () {

            cy.get('#add-new-channel-btn').click()
            cy.get(CANCEL_BUTTON).click()

            cy.get('#channel-1').should('not.exist')

        })

})