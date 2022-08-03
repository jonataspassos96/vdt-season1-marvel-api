import characters from '../fixtures/characters.json'

describe('POST /characters', () => {

    const character = {
        name: 'Logan',
        alias: 'Wolverine',
        team: ['x-men'],
        active: true
    }

    it('deve cadastrar um personagem', () => {
        cy.postCharacter(character)
            .then(res => {
                expect(res.status).to.eq(201)
                expect(res.body.character_id.length).to.eq(24)
            })
    })

    it('não deve cadastrar duplicado', () => {
        cy.postCharacter(character)
            .then(res => {
                expect(res.status).to.eq(400)
                expect(res.body.error).to.eq('Duplicate character')
            })
    })

    context('todos os campos são obrigatórios', () => {

        const fields = ['name', 'alias', 'team', 'active']

        fields.forEach(field => {
            it(`campo ${field} é obrigatório`, () => {
                const copy = JSON.parse(JSON.stringify(character))

                delete copy[field]

                cy.postCharacter(copy)
                    .then(res => {
                        expect(res.status).to.eq(400)
                        expect(res.body.validation.body.message).deep.include(field)
                    })
            })
        })
    })

})
