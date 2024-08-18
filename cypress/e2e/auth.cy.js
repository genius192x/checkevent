/// <reference types="cypress" />

context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  })

  it('cy.request() - make an XHR request', () => {
    cy.request('http://localhost:4080/user').as('user')
    // https://on.cypress.io/request
    cy.get('@user').then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('firstName', 'John') // true
      })
  })
})
