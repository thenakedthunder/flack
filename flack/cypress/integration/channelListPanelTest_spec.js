const CHANNEL_NAME_INPUT_ID = '#channelname-input'
const SUBMIT_CHANNEL_NAME_BUTTON = '#channel-name-ok-btn'
const CANCEL_BUTTON = '#cancel-btn'




before(function () {

    reloadPageAndPutInDisplayName();

})

function reloadPageAndPutInDisplayName() {
    cy.visit('http://127.0.0.1:5000/');
    cy.get('#displayname-input').type('P.I.M.P.');
    cy.get('#display-name-ok-btn').click();
}

describe('New channel displayed in list', function () {
    it('tests that the new channel created appears right in the channel list',
        function () {

            cy.get('#add-new-channel-btn').click()
            cy.get(CHANNEL_NAME_INPUT_ID).type('Bumburny�kok')
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).click()

            const currentTime = new Date()
            const minutes = currentTime.getMinutes()
            const minutesFormatted = minutes < 10 ? "0" + minutes : minutes

            cy.get('#channel-0 .MuiListItemText-primary').should('have.text',
                'Bumburny�kok')
            cy.get('#channel-0 .MuiListItemText-secondary').should('have.text',
                `Created today at ${currentTime.getHours()}:` +
                `${minutesFormatted} by P.I.M.P.`)

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

describe('Channels stored in memory displayed on (re)load', function () {
    it('tests that channels existing in server memory appear in the channel list on load/reload',
        function () {

            cy.get('#add-new-channel-btn').click()
            cy.get(CHANNEL_NAME_INPUT_ID).type('H�mpell�r F.C.')
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).click()

            cy.get('#add-new-channel-btn').click()
            cy.get(CHANNEL_NAME_INPUT_ID).type('Mes�ge Bt.')
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).click()

            reloadPageAndPutInDisplayName()

            cy.get('#channel-1 .MuiListItemText-primary').should('have.text', 'H�mpell�r F.C.')
            cy.get('#channel-2 .MuiListItemText-primary').should('have.text', 'Mes�ge Bt.')

        })
})

