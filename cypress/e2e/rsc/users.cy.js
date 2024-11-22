describe("Users page", () => {
  beforeEach(() => {
    cy.visit("/rsc/users");
  });

  // For Server Components, you don't need to wait for anything, the page loads with the data and the test will pass
  it("should display a list of users", () => {
    cy.contains("Users").should("exist");
  });

  it("should display a user with a name", () => {
    cy.get("li").first().should("contain", "Leanne Graham");
  });

  it("should navigate to the details page", () => {
    cy.get("a")
      .first()
      .invoke("text")
      .then((text) => {
        cy.get("a").first().click();
        cy.contains(text).should("exist");
      });
  });
});
