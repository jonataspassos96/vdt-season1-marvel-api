import { createCharacter, listCharacters } from '../fixtures/characters.json'

describe('GET /characters', () => {

    before(() => {
        cy.setToken()
        cy.back2ThePast()

        createCharacter.forEach((c) => {
            cy.postCharacter(c)
                .then(res => {
                    expect(res.status).to.eq(201)
                }).as('created hero')
        })
    })

    it.only('deve retornar uma listade personagens', () => {
        cy.api({
            method: 'GET',
            url: '/characters',
            headers: {
                authorization: Cypress.env('token')
            }
        }).as('list heroes').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.a('array')

            listCharacters.forEach((character, i) => {
                expect(res.body[i].team).to.deep.eq(character.team)
                expect(res.body[i].name).to.deep.eq(character.name)
                expect(res.body[i]).to.have.property('_id')
                expect(res.body[i].alias).to.deep.eq(character.alias)
                expect(res.body[i].active).to.deep.eq(character.active)
                expect(res.body[i].user_id).to.deep.eq(character.user_id)
            })
        }).as('validate fields')
    })

})
