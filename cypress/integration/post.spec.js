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

    cy.api({
      method: 'POST',
      url: '/characters',
      headers: {
        authorization: Cypress.env('token')
      },
      body: character
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body.character_id.length).to.eq(24)
    })
  })

})

