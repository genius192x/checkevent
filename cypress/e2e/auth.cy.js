

describe("books page", () => {
  describe("when there are two books", () => {
    before(() => {
      cy.mocksSetCollection("all-users"); // Use "two-books" collection
      cy.visit("/");
    });

    it("should display two books", () => {
      cy.get("#books li").should("have.length", 2);
    });
  });

  // describe("when there is an error loading data", () => {
  //   before(() => {
  //     cy.mocksUseRouteVariant("get-books:error"); // Use "get-books:error" route variant
  //     cy.visit("/");
  //   });

  //   after(() => {
  //     cy.mocksRestoreRouteVariants(); // Restore mock route variants after the test
  //   });

  //   it("should display error message", () => {
  //     cy.get("#books .error").should("exist");
  //   });
  // });

});