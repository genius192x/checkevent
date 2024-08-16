

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.intercept({
      method: 'POST',
      url: `http://localhost:4080/#//user`,
    }).as('apiCheck')
    cy.wait('@apiCheck').then((interception) => {
      assert.isNotNull(interception.response, '1st API call has data')
    })

  })
})