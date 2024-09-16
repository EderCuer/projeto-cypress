describe('Companies endpoint', () => {

  before(() => {
    cy.setToken()
  })

  context('/GET', () => {
    it('consultar distribuidora com nome exato', () => {
      cy.getCompany('Netflix').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.have.property('name', 'Netflix')
      })
    })

    it('consultar distribuidora inexistente', () => {
      cy.getTvShow('Apple +').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })
})