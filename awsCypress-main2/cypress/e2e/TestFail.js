describe("Caddy Home And Category Page.", () => {
  it("Verify Caddy Resource Library Page.", () => {
      cy.visit(sfgh);
      cy.get("p").click();
  });
});
