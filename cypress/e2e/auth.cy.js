describe('authorization', () => {
  it('should return user tokens when email and password are valid', () => {
    const email = 'test@example.com';
    const password = 'test_password';
    cy.request('POST', 'https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/auth', {
        "email": "12@rew.re",
        "password": "123"
    })
      .its('status')
      .should('equal', 200);
  });
  it('should return 404 when email and password are not found', () => {
    const email = '13@rew.re';
    const password = '123';
    cy.request('POST', 'https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/auth', [{ email, password }], {failOnStatusCode: false})
      .its('status')
      .should('equal', 404);
  })
  // it('should return 404 when email or password is invalid', () => {
  //   const email = "12@rew.re";
  //   const password = "1234";
  //   cy.request('POST', 'https://6bccdedf-dcf6-42bd-b1b6-ee13ec818593.mock.pstmn.io/auth', [
  //       {
  //           "email": "13@rew.re",
  //           "password": "123"
  //       }
  //   ])
  //     .its('status')
  //     .should('equal', '404: Not Found');
  // });
});
