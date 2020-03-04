const CHANNEL_NAME_INPUT_ID = '#channelname-input'
const SUBMIT_CHANNEL_NAME_BUTTON = '#channel-name-ok-btn'



before(function () {

    cy.visit('http://127.0.0.1:5000/');
    cy.get('#displayname-input').type('Thunder the Gun.');
    cy.get('#display-name-ok-btn').click();

})

describe('Channel view shows basic channel data correctly', function () {
    it('tests that the channel view shows the channel data correctly when there are no messages in it',
        function () {

            cy.get('#add-new-channel-btn').click()
            cy.get(CHANNEL_NAME_INPUT_ID).type('Ebugatták gyülekezete')
            cy.get(SUBMIT_CHANNEL_NAME_BUTTON).click()

            cy.get("#drawer-list-items").children().last().click()
            cy.get("#channel-name").should('have.text', 'Ebugatták gyülekezete')

            const currentTime = new Date()
            const minutes = currentTime.getMinutes()
            const minutesFormatted = minutes < 10 ? "0" + minutes : minutes
            cy.get('#channel-creation-info').should('have.text',
                `Created today at ${currentTime.getHours()}:` +
                `${minutesFormatted} by P.I.M.P.`)

            cy.get('#messages').should('have.text', "No messages yet in this channel.")

        })
})

