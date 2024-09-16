Cypress.Commands.add('postSessions', (user, pass) => {
  cy.api({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/sessions`,
    failOnStatusCode: false,
    body: {
      email: user,
      password: pass
    }
  })
})

// Leads
Cypress.Commands.add('postLead', (email, name) => {
  cy.api({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/leads`,
    failOnStatusCode: false,
    body: {
      email: email,
      name: name
    }
  })
})

Cypress.Commands.add('getLead', (email) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/leads`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`,
    },
    qs: {
      email: email
    }
  })
})

Cypress.Commands.add('deleteLead', (id) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/leads/${id}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`,
      Accept: 'application/json, text/plain, */*'
    }
  })
})

// Movies
Cypress.Commands.add('postMovie', (movie) => {
  cy.getCompany(movie.company).then((response) => {
    const payload = new FormData();
    payload.append("title", movie.title);
    payload.append("overview", movie.overview);
    payload.append("company_id", response.body.data[0].id);
    payload.append("release_year", movie.release_year);
    payload.append("featured", movie.featured);
    cy.api({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/movies`,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
        Accept: 'application/json, text/plain, */*'
      },
      body: payload
    })
  })
})

Cypress.Commands.add('getMovie', (movie) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/movies?title=${movie}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`,
      Accept: 'application/json, text/plain, */*'
    }
  })
})

Cypress.Commands.add('deleteMovie', (id) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/movies/${id}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`,
      Accept: 'application/json, text/plain, */*'
    }
  })
})

// Company
Cypress.Commands.add('getCompany', (company) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/companies`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`
    },
    qs: {
      name: company
    }
  })
})

// TV Show
Cypress.Commands.add('postTvShow', (serie) => {
  cy.getCompany(serie.company).then((response) => {
    const payload = new FormData();
    payload.append("title", serie.title);
    payload.append("overview", serie.overview);
    payload.append("company_id", response.body.data[0].id);
    payload.append("release_year", serie.release_year);
    payload.append("seasons", serie.seasons);
    payload.append("featured", serie.featured);
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/tvshows`,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
        Accept: 'application/json, text/plain, */*'
      },
      body: payload
    })
  })
})

Cypress.Commands.add('getTvShow', (serie) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/tvshows?title=${serie}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`
    }
  })
})

Cypress.Commands.add('deleteTvShow', (id) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/tvshows/${id}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`,
      Accept: 'application/json, text/plain, */*'
    }
  })
})