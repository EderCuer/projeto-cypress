const data = require('../../fixtures/series.json')

describe('TV Shows endpoint', () => {

  before(() => {
    cy.setToken()
    cy.exec(`node ./cypress/support/scripts/cleanDatabase.js tvshows`, { failOnNonZeroExit: false })
  })

  context('/POST', () => {
    it.only('cadastra nova série', () => {
      const serie = data.big_bang_theory

      cy.postTvShow(serie).then((response) => {
        expect(response.status).to.eq(201)
      })

      cy.getTvShow(serie.title).then((response) => {
        expect(response.body.data[0]).to.have.property('title', serie.title)
      })
    })

    it('valida cadastro de série já existente', () => {
      const serie = data.breaking_bad
      cy.postTvShow(serie)

      cy.postTvShow(serie).then((response) => {
        expect(response.status).to.eq(409)
      })
    })
  })

  context('/GET', () => {
    it('consultar série com nome exato', () => {
      const serie = data.game_of_thrones
      cy.postTvShow(serie)

      cy.getTvShow(serie.title).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.have.property('title', serie.title)
      })
    })

    it('consultar série inexistente', () => {
      cy.getTvShow('Sopranos').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

  context('/DELETE', () => {
    it('remover filme', () => {
      const serie = data.o_mundo_sombrio_de_sabrina
      cy.postTvShow(serie)

      cy.getTvShow(serie.title).then((response) => {
        const id = response.body.data[0].id

        cy.deleteTvShow(id).then((response) => {
          expect(response.status).to.eq(204)
        })
      })

      cy.getTvShow(serie.title).then((response) => {
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

})