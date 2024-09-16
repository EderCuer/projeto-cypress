import { faker } from '@faker-js/faker'
import { leadsEl } from '../../support/elements/leads/elements'

describe('Leads', () => {

  it('cadastrar lead na lista de espera', () => {
    // Arrange
    const name = faker.person.fullName()
    const email = faker.internet.email()

    // Act
    cy.visit('/')
    cy.contains('Aperte o play... se tiver coragem').click()

    cy.get(leadsEl.name).type(name)
    cy.get(leadsEl.email).type(email)
    cy.contains('Quero entrar na fila!').click()

    // Assert
    cy.get(leadsEl.popup).should('be.visible')
    cy.get(leadsEl.popup).should('contain', 'Em breve, nossa equipe entrará em contato.')
  })

  it('validar cadastro de lead já existente', () => {
    // Arrange
    const name = faker.person.fullName()
    const email = faker.internet.email()

    cy.postLead(email, name)

    // Act
    cy.visit('/')
    cy.contains('Aperte o play... se tiver coragem').click()

    cy.get(leadsEl.name).type(name)
    cy.get(leadsEl.email).type(email)
    cy.contains('Quero entrar na fila!').click()

    // Assert
    cy.get(leadsEl.popup).should('be.visible')
    cy.get(leadsEl.popup).should('contain', 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera.')    
  })

  it('validar cadastro de lead com e-mail incorreto', () => {
    // Arrange
    const name = faker.person.fullName()

    // Act
    cy.visit('/')
    cy.contains('Aperte o play... se tiver coragem').click()

    cy.get(leadsEl.name).type(name)
    cy.get(leadsEl.email).type('teste.com')
    cy.contains('Quero entrar na fila!').click()

    // Assert
    cy.get(leadsEl.labelEmail).should('contain', 'Email incorreto')
  })
})