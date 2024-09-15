describe('The Register Page', () => {

  it('sets auth cookie when logging in via form submission', function () {

    cy.visit('/authorization')
    cy.get('.mt-4.text-center.text-sm .underline').click()
    cy.get('input[name=name]').type('Иван')
    cy.get('input[name=surname]').type('Иванов')

    cy.get('input[name=email]').type('123@mail.ru')

    cy.get('input[name=password]').type(`11234112{enter}`)

    cy.getAllLocalStorage('curToken').should('exist')

  })
})