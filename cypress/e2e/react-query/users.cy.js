describe("Users page", () => {
  beforeEach(() => {
    // Intercept any requests matching the pattern and return the fixture
    // You can also not return the fixture and get the actual response but this is faster
    cy.intercept("GET", "api/v1/users", { fixture: "users.json" }).as("users");

    cy.visit("/react-query/users");

    // Wait for the request to finish
    cy.wait("@users");
  });

  // For React-Query (or any client-side data fetching library), you need to wait for the data to be fetched and actually validate the data
  it("should display a list of users", () => {
    cy.get("li").should("have.length", 10);
  });

  it("should display a user with a name", () => {
    cy.get("li").first().should("contain", "Leanne Graham");
  });

  it("should navigate to the details page", () => {
    // Get the text of the first user
    cy.get("a")
      .first()
      .invoke("text")
      .then((text) => {
        // Click on the first user
        cy.get("a").first().click();

        // Check if the user name is displayed
        cy.contains(text).should("exist");
      });
  });
});
