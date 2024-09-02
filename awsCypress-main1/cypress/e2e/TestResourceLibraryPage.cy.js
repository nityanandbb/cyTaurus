describe("Caddy Home And Category Page.", () => {
  it("Verify Caddy Resource Library Page.", () => {
    cy.visit("https://www.nvent.com/en-us/resources/resource-library/caddy");

    cy.get(".search-input").should("be.visible");
    cy.get("#edit-brand--wrapper > .h2").should("be.exist");
    cy.get(".resource-set__id-47646 > .resource-set__view_all").click();
    cy.wait(5000);
  });
});
