const data = require('../../fixtures/movies.json')

describe('Movies endpoint', () => {

  before(() => {
    cy.setToken()
    cy.exec(`node ./cypress/support/scripts/cleanDatabase.js movies`, { failOnNonZeroExit: false })
  })

  context('/POST', () => {
    it('cadastra novo filme', () => {
      const movie = data.exterminio
      cy.postMovie(movie).then((response) => {
        expect(response.status).to.eq(201)
      })

      cy.getMovie(movie.title).then((response) => {
        expect(response.body.data[0]).to.have.property('title', movie.title)
      })
    })

    it('valida cadastro de filme já existente', () => {
      const movie = data.madrugada_dos_mortos
      cy.postMovie(movie)

      cy.postMovie(movie).then((response) => {
        expect(response.status).to.eq(409)
      })
    })
  })

  context('/GET', () => {
    it('consultar filme com nome exato', () => {
      const movie = data.zumbilandia
      cy.postMovie(movie)

      cy.getMovie(movie.title).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.have.property('title', movie.title)
      })
    })

    it('listar filmes pelo nome parcial', () => {
      const movie1 = data.zumbilandia
      const movie2 = data.orgulho_e_preconceito_e_zumbis
      const movie3 = data.meu_namorado_e_um_zumbi
      cy.postMovie(movie1)
      cy.postMovie(movie2)
      cy.postMovie(movie3)

      cy.getMovie('zumbi').then((response) => {
        expect(response.status).to.eq(200)
        response.body.data.forEach(movie => {
          expect(movie.title.toLowerCase()).to.include('zumbi')
        });
      })
    })

    it('consultar filme inexistente', () => {
      cy.getMovie('A Bruxa de Blair').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

  context('/DELETE', () => {
    it('remover filme', () => {
      const movie = data.dead_snow
      cy.postMovie(movie)

      cy.getMovie(movie.title).then((response) => {
        const id = response.body.data[0].id

        cy.deleteMovie(id).then((response) => {
          expect(response.status).to.eq(204)
        })
      })

      cy.getMovie(movie.title).then((response) => {
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

})