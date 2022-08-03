import characters from '../fixtures/characters.json'

describe('DELETE /characters', () => {

    const character = {
        name: 'Peter Parker',
        alias: 'Homem Aranha',
        team: ['novos vingadores'],
        active: true
    }

    before(() => {
        cy.setToken()

        cy.postCharacter(character).then(res => {
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
