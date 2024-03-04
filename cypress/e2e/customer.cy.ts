describe("testing customer screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#email").type("k@k.com");
    cy.get("#pass").type("1");
    cy.get("#btn").click();

    cy.get("#btn-clients").click();
  });

  it("testing customer filter", () => {
    cy.get("#customer-filter").type("Kallif");
    cy.get("#customer-docNum").type("963.852.741-25");
    cy.get("#customer-status").type("Ativo");
  });

  it("testing customer creation", async () => {
    cy.get("#register-client").click();

    cy.get("#customer-zipcode")
      .type("12328320")
      .then(() => {
        cy.get("#customer-name").type("Francisco");
        cy.get("#customer-surname").type("Neves");
        cy.get("#customer-email").type("fran@cisco.com");
        cy.get("#customer-phone").type("1291919292");
        cy.get("#customer-cpf").type("12312312385");
      });

    cy.get("#btn-register").click();

    cy.get("#btn-close").click();
  });
});
