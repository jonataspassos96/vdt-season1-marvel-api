import characters from '../fixtures/characters.json'

describe('GET /characters', () => {

    before(() => {
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', () => {
        cy.getCharacters().then(res => {
            Cypress.env('characterId', res.body[2]._id)

            expect(res.status).to.eq(200)
            expect(res.body).to.be.a('array')
            expect(res.body.length).greaterThan(0)

            characters.forEach((c, i) => {
                expect(res.body[i].team).to.deep.eq(c.team)
                expect(res.body[i].name).to.deep.eq(c.name)
                expect(res.body[i]).to.have.property('_id')
                expect(res.body[i].alias).to.deep.eq(c.alias)
                expect(res.body[i].active).to.deep.eq(c.active)
                expect(res.body[i].user_id).to.deep.eq(Cypress.env('id'))
            })
        }).as('validate fields')
    })

    it('deve poder buscar personagem por nome', () => {
        cy.getCharacters('?name=Wanda').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.a('array')
            expect(res.body.length).to.eq(1)

            expect(res.body[0].team).to.deep.eq(characters[1].team)
            expect(res.body[0].name).to.deep.eq(characters[1].name)
            expect(res.body[0]).to.have.property('_id')
            expect(res.body[0].alias).to.deep.eq(characters[1].alias)
            expect(res.body[0].active).to.deep.eq(characters[1].active)
            expect(res.body[0].user_id).to.deep.eq(Cypress.env('id'))
        })
    })

    it('deve poder buscar personagem pelo id', () => {
        cy.getCharacters(`/${Cypress.env('characterId')}`).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.a('object')

            expect(res.body.team).to.deep.eq(characters[2].team)
            expect(res.body.name).to.deep.eq(characters[2].name)
            expect(res.body).to.have.property('_id')
            expect(res.body.alias).to.deep.eq(characters[2].alias)
            expect(res.body.active).to.deep.eq(characters[2].active)
            expect(res.body.user_id).to.deep.eq(Cypress.env('id'))
        })
    })

    it('deve retornar 404 ao buscar por id não cadastrado', () => {
        cy.getCharacters('/62eaccc1ae7847780300e7da')
            .then(res => {
                expect(res.status).to.eq(404)
            })
    })

})
