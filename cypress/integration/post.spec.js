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

    cy.request({
      method: 'POST',
      url: '/characters',
      headers: {
        authorization: Cypress.env('token')
      },
      body: character
    }).then(response => {
      expect(response.status).be.eq(201)
    })
  })

})

