import { faker } from '@faker-js/faker'

describe('Leads endpoint', () => {

  before(() => {
    cy.setToken()
  })

  context('/POST', () => {

    it('cadastra novo lead', () => {
      const name = faker.person.fullName()
      const email = faker.internet.email()

      cy.postLead(email, name).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('createdAt')
        expect(response.body).to.have.property('name', name)
        expect(response.body).to.have.property('email', email)
      })
    })

    it('valida cadastro de lead já existente', () => {
      const name = faker.person.fullName()
      const email = faker.internet.email()

      cy.postLead(email, name)

      cy.postLead(email, name).then((response) => {
        expect(response.status).to.eq(409)
        expect(response.body).to.have.property('error', 'This lead is already registered.')
      })
    })

    it('valida cadastro de lead com email inválido', () => {
      const name = faker.person.fullName()

      cy.postLead('teste.com', name).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Validation fails')
        expect(response.body.error[0]).to.have.property('message', 'email must be a valid email')
      })
    })

    it('valida cadastro de lead sem preencher nome', () => {
      const email = faker.internet.email()

      cy.postLead(email, '').then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Validation fails')
        expect(response.body.error[0]).to.have.property('message', 'name is a required field')
      })
    })

    it('valida cadastro de lead sem preencher email', () => {
      const name = faker.person.fullName()

      cy.postLead('', name).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Validation fails')
        expect(response.body.error[0]).to.have.property('message', 'email is a required field')
      })
    })
  })

  context('/GET', () => {

    it('consultar lead cadastrado', () => {
      const name = faker.person.fullName()
      const email = faker.internet.email()

      cy.postLead(email, name)

      cy.getLead(email).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.have.property('email', email)
      })
    })

    it('validar consulta de lead inexistente', () => {
      cy.getLead('teste@gmail.com').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

  context('/DELETE', () => {
    it('remover lead', () => {
      const name = faker.person.fullName()
      const email = faker.internet.email()

      cy.postLead(email, name)

      cy.getLead(email).then((response) => {
        const id = response.body.data[0].id

        cy.deleteLead(id).then((response) => {
          expect(response.status).to.eq(204)
        })
      })

      cy.getLead(email).then((response) => {
        expect(response.body.data[0]).to.be.undefined
      })
    })
  })

})