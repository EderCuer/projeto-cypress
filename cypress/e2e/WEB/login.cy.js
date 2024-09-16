import { login } from '../../support/elements/login/elements'
import { movies } from '../../support/elements/movies/elements'

describe('Login', () => {

  it('logar como administrador', () => {
    // Act
    cy.login()

    // Assertion
    cy.get(movies.loggedIn).should('be.visible')
    cy.get(movies.loggedIn).should('contain', 'Olá, Admin')
  })

  it('validar senha incorreta', () => { 
    // Act
    cy.login(Cypress.env('user'), 'abc123')
    
    // Assertion
    cy.get(login.popup).should('be.visible')
    cy.get(login.popup).should('contain', 'Ocorreu um erro ao tentar efetuar o login.')
  })

  it('validar e-mail inválido', () => {  
    // Act
    cy.login('error@zombieplus.com', Cypress.env('pass'))
    
    // Assertion
    cy.get(login.popup).should('be.visible')
    cy.get(login.popup).should('contain', 'Ocorreu um erro ao tentar efetuar o login.')
  })

})