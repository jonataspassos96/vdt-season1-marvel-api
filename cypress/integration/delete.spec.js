import characters from '../fixtures/characters.json'

describe('DELETE /characters', () => {

    before(() => {
        cy.setToken()
        cy.back2ThePast()

        cy.postCharacter(characters[0]).then(res => {
            Cypress.env('characterId', res.body.character_id)
        })
    })

    it('deve remover um personagem por id', () => {
        cy.deleteCharacter(Cypress.env('characterId'))
            .then(res => {
                expect(res.status).to.eq(204)
            })
    })

    it('deve retornar 404 ao remover por id não cadastrado', () => {
        cy.deleteCharacter(Cypress.env('characterId'))
            .then(res => {
                expect(res.status).to.eq(404)
            })
    })
})
