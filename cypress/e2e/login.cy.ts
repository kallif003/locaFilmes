describe("testing login screen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("testing password display", () => {
    cy.get("#pass").type("1");

    cy.get("#showPassword").click();
  });

  it("responsiveness test", () => {
    cy.viewport(400, 680);
  });

  it("sucess login", () => {
    cy.get("#email").type("k@k.com");
    cy.get("#pass").type("1");

    cy.get("#btn").click();

    cy.location().should((location) => {
      expect(location.href).to.eq("http://localhost:8080/Painel/Usuarios");
    });
  });

  it("user not found", () => {
    cy.get("#email").type("k@kh.com");
    cy.get("#pass").type("1");

    cy.get("#btn").click();

    cy.get("#errorMsg").should(
      "contain.text",
      "Usuário não encontrado. Tente novamente"
    );
  });

  it("incorrect password", () => {
    cy.get("#email").type("k@k.com");
    cy.get("#pass").type("1234");

    cy.get("#btn").click();
    cy.get("#errorMsg").should(
      "contain.text",
      "Senha incorreta. Tente novamente"
    );
  });
});
