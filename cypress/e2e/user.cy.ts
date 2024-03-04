describe("Testing User screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#email").type("k@k.com");
    cy.get("#pass").type("1");
    cy.get("#btn").click();
  });

  it("testing user selectionr", () => {
    cy.get("#userFilter").select("pedro");
  });

  it("testing docNum selection", () => {
    cy.get("#docNumFillter").select("23345453311");
  });

  it("testing items per page", () => {
    cy.get("#itemsPerPage").select("25");
  });

  it("testing pagination plus and minus button", () => {
    cy.get("#plus").click();
    cy.get("#less").click();
  });

  it("testing user creation", () => {
    cy.get("#register").click();

    cy.get("#username").type("Arnaldo");
    cy.get("#user-email").type("ar@naldo.com");
    cy.get("#user-docNum").type("123.123.123-84");
    cy.get("#user-password").type("1234");

    cy.get("#btn-register").click();

    cy.get("#btn-close").click();
  });
});
