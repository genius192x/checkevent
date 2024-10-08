describe('The Login Page', () => {

  it('sets auth cookie when logging in via form submission', function () {

    cy.visit('/authorization')

    cy.get('input[name=email]').type('123@mail.ru')

    cy.get('input[name=password]').type(`11234112{enter}`)

    cy.getAllLocalStorage('curToken').should('exist')

  })
})