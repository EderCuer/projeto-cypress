describe('Sessions endpoint', () => {
  it('gerar token com dados válidos', () => {
    cy.postSessions(Cypress.env('user'), Cypress.env('pass')).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
    })
  })

  it('validar geração de token com dados inválidos', () => {
    cy.postSessions(Cypress.env('user'), '123').then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('error', 'Invalid access credentials. Please check your login information.')
    })
  })
})