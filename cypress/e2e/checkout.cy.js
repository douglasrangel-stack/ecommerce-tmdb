describe("Fluxo de checkout", () => {
  it("Preenche o formulário e envia", () => {
    cy.visit("/checkout");

    cy.get('[data-testid="input-nome"]').type("Douglas Rangel");
    cy.get('[data-testid="input-cpf"]').type("12345678900");
    cy.get('[data-testid="input-celular"]').type("11912345678");
    cy.get('[data-testid="input-email"]').type("douglas@exemplo.com");
    cy.get('[data-testid="input-cep"]').type("01001000");
    cy.get('[data-testid="input-endereco"]').type("Rua Exemplo, 123");
    cy.get('[data-testid="input-cidade"]').type("São Paulo");
    cy.get('[data-testid="input-estado"]').type("SP");

    cy.contains("Finalizar").click();
  });
});
