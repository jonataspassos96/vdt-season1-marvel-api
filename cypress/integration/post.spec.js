describe('POST /characters', () => {

    before(() => {
        cy.setToken()
        cy.back2ThePast()
    })

    it('deve cadastrar um personagem', () => {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(res => {
                expect(res.status).to.eq(201)
                expect(res.body.character_id.length).to.eq(24)
            })
    })

    context('quando o personagem já existe', () => {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
                .then(res => {
                    expect(res.status).to.eq(201)
                })
        })

        it('não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
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
