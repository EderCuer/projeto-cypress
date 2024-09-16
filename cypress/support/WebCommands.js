import { login } from './elements/login/elements'
import { movies } from './elements/movies/elements'
import { series } from './elements/series/elements'

// Commons
Cypress.Commands.add('login', (email = Cypress.env('user'), senha = Cypress.env('pass')) => {
  cy.visit('/admin/login')
  cy.get(login.inputEmail).type(email)
  cy.get(login.inputSenha).type(senha, { log: false })
  cy.contains('Entrar').click()
})

Cypress.Commands.add('setToken', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/sessions`,
    body: {
      email: 'admin@zombieplus.com',
      password: 'pwd123'
    }
  }).then((response) => {
    const token = response.body.token
    Cypress.env('token', token)
  })
})

// Movies
Cypress.Commands.add('cadastraFilme', (movie) => {
  cy.get(movies.titulo).type(movie.title)
  cy.get(movies.sinopse).type(movie.overview)
  cy.get(movies.distribuidora)
    .click()
    .find(movies.menuList)
    .contains(movie.company)
    .click()
  cy.get(movies.lancamento)
    .click()
    .find(movies.menuList)
    .contains(movie.release_year)
    .click()
  cy.get(movies.cover).selectFile(movie.cover)
  cy.get('button')
    .contains('Cadastrar').click()
})

Cypress.Commands.add('removerFilme', (movie) => {
  cy.contains('td.title', movie).parent().find(movies.removeIcon).click()
  cy.get(movies.confirmRemoval).click()
})

// Séries
Cypress.Commands.add('cadastraSerie', (serie) => {
  cy.get(series.titulo).type(serie.title)
  cy.get(series.sinopse).type(serie.overview)
  cy.get(series.distribuidora)
    .click()
    .find(series.menuList)
    .contains(serie.company)
    .click()
  cy.get(series.lancamento)
    .click()
    .find(series.menuList)
    .contains(serie.release_year)
    .click()
  cy.get(series.temporadas).type(serie.seasons)
  cy.get(series.cover).selectFile(serie.cover)
  cy.get('button')
    .contains('Cadastrar').click()
})

Cypress.Commands.add('removerSerie', (serie) => {
  cy.contains('td.title', serie).parent().find(series.removeIcon).click()
  cy.get(series.confirmRemoval).click()
})