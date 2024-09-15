import { series } from '../../support/elements/series/elements'

const data = require('../../fixtures/series.json')

describe('Séries', () => {

  before(() => {
    cy.setToken()
    // Comando que limpa a tabela movies
    cy.exec(`node ./cypress/support/scripts/cleanDatabase.js tvshows`, { failOnNonZeroExit: false })
  })

  beforeEach(() => {
    cy.intercept('GET', '/companies').as('waitCompanies')
    cy.intercept('POST', '/tvshows').as('responseMovie')
  })

  it('cadastrar nova série', () => {
    // Arrange
    const serie = data.big_bang_theory
    cy.login()
    cy.contains('Séries de TV').click()

    // Act
    cy.get(series.addTvShow).click()
    cy.wait('@waitCompanies')
    cy.cadastraSerie(serie)

    // Assert
    cy.get(series.popup).should('be.visible')
    cy.get(series.popup).should('contain', `A série '${serie.title}' foi adicionada ao catálogo.`)
    cy.wait('@responseMovie')
    cy.get('#root').should('contain', serie.title)
  })

  it('validar cadastro de série duplicada', () => {
    // Arrange
    const serie = data.game_of_thrones
    cy.postTvShow(serie)
    cy.login()
    cy.contains('Séries de TV').click()

    // Act
    cy.get(series.addTvShow).click()
    cy.wait('@waitCompanies')
    cy.cadastraSerie(serie)

    // Assert
    cy.get(series.popup).should('be.visible')
    cy.get(series.popup).should('contain', `O título '${serie.title}' já consta em nosso catálogo.`)
    cy.wait('@responseMovie')
    cy.get('#root').should('not.contain', serie.title)
  })

  it('remover série', () => {
    // Arrange
    const serie = data.breaking_bad
    cy.postTvShow(serie)
    cy.login()
    cy.contains('Séries de TV').click()

    // Act
    cy.removerSerie(serie.title)

    // Assert
    cy.get(series.popup).should('be.visible')
    cy.get(series.popup).should('contain', 'Série removida com sucesso.')
    cy.get('#root').should('not.contain', serie.title)
  })
})