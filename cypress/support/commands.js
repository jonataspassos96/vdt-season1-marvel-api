// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* Cypress.Commands.add('resetCharacters', (id) => {
  cy.request({
    method: 'DELETE',
    url: `/back2thepast/${id}`
  }).then(response => {
    expect(response.status).be.equal(200);
  })
})
 */

Cypress.Commands.add('setToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'jonatas@qacademy.io',
            password: 'qa-cademy'
        }
    }).as('login').then(res => {
        expect(res.status).to.eq(200)

        Cypress.env('token', res.body.token)
        Cypress.env('id', res.body.user._id)
    })
})

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: 'DELETE',
        url: `/back2thepast/${Cypress.env('id')}`
    }).as('clean heroes').then(res => {
        expect(res.status).to.eq(200);
    })
})

Cypress.Commands.add('postCharacter', (payload) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        failOnStatusCode: false,
        headers: {
            authorization: Cypress.env('token')
        },
        body: payload
    }).as('created hero').then(res => res)
})

Cypress.Commands.add('getCharacters', (payload = '') => {
    cy.api({
        method: 'GET',
        url: `/characters${payload}`,
        headers: {
            authorization: Cypress.env('token')
        }
    }).as('list heroes').then(res => res)
})

Cypress.Commands.add('populateCharacters', (payload) => {
    payload.forEach(c => {
        cy.postCharacter(c).then(res => {
            expect(res.status).to.eq(201)
            expect(res.body.character_id.length).to.eq(24)
        })
    })
})
