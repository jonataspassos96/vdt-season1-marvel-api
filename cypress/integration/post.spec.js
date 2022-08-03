import characters from '../fixtures/characters.json'

describe('POST /characters', () => {

    before(() => {
        cy.setToken()
        cy.back2ThePast()
    })

    it('deve cadastrar um personagem', () => {
        cy.postCharacter(characters[1])
            .then(res => {
                expect(res.status).to.eq(201)
                expect(res.body.character_id.length).to.eq(24)
            })
    })

    context('quando o personagem já existe', () => {

        before(() => {
            cy.postCharacter(characters[2])
                .then(res => {
                    expect(res.status).to.eq(201)
                    expect(res.body.character_id.length).to.eq(24)
                })
        })

        it('não deve cadastrar duplicado', () => {
            cy.postCharacter(characters[2])
                .then(res => {
                    expect(res.status).to.eq(400)
                    expect(res.body.error).to.eq('Duplicate character')
                })
        })

    })

    context('todos os campos são obrigatórios', () => {
        const character = {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men', 'illuminatis'],
            active: true
        }

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
