import { movies } from '../../support/elements/movies/elements'

const data = require('../../fixtures/movies.json')

describe('Movies', () => {

  before(() => {
    cy.setToken()
    // Comando que limpa a tabela movies
    cy.exec(`node ./cypress/support/scripts/cleanDatabase.js movies`, { failOnNonZeroExit: false })
  })

  beforeEach(() => {
    cy.intercept('GET', '/companies').as('waitCompanies')
    cy.intercept('POST', '/movies').as('responseMovie')
  })

  it('cadastrar novo filme', () => {
    // Arrange
    const movie = data.guerra_mundial_z
    cy.login()

    // Act
    cy.get(movies.addMovie).click()
    cy.wait('@waitCompanies')
    cy.cadastraFilme(movie)

    // Assert
    cy.get(movies.popup).should('be.visible')
    cy.get(movies.popup).should('contain', `O filme '${movie.title}' foi adicionado ao catálogo.`)
    cy.wait('@responseMovie')
    cy.get('#root').should('contain', movie.title)
  })

  it('validar cadastro de filme duplicado', () => {
    // Arrange
    const movie = data.resident_evil_o_hospedeiro
    cy.postMovie(movie)
    cy.login()

    // Act
    cy.get(movies.addMovie).click()
    cy.wait('@waitCompanies')
    cy.cadastraFilme(movie)

    // Assert
    cy.get(movies.popup).should('be.visible')
    cy.get(movies.popup).should('contain', `O título '${movie.title}' já consta em nosso catálogo.`)
    cy.wait('@responseMovie')
    cy.get('#root').should('not.contain', movie.title)
  })

  it('remover filme', () => {
    // Arrange
    const movie = data.a_noite_dos_mortos_vivos
    cy.postMovie(movie)
    cy.login()

    // Act
    cy.removerFilme(movie.title)

    // Assert
    cy.get(movies.popup).should('be.visible')
    cy.get(movies.popup).should('contain', 'Filme removido com sucesso.')
    cy.get('#root').should('not.contain', movie.title)
  })
})