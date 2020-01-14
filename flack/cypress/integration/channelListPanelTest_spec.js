const CHANNEL_NAME_INPUT_ID = '#channelname-input'
const SUBMIT_CHANNEL_NAME_BUTTON = '#channel-name-ok-btn'





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

            cy.get('#channel-1').should('have.text', 'Bumburnyákok')

        })

})