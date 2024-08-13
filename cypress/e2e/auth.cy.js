describe('The Login Page', () => {

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    // const { username, password } = this.currentUser

    cy.visit('http://localhost:8080/checkevent/#/authorization')

    cy.get('input[name=email]').type('123@mail.ru')

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`11234112{enter}`)

    // we should be redirected to /dashboard
    // cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getAllLocalStorage('curToken').should('exist')

    // UI should reflect this user being logged in
    // cy.get('h1').should('contain', 'jane.lane')
  })
})