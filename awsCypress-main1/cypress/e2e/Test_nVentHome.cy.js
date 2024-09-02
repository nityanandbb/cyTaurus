describe("nVent Home spec", () => {
  it("Verify nVent Home.", () => {
    cy.visit("https://nvent.com/en-us/");
    cy.log("verify nVent Logo is visible");
    cy.get(".logo__img").should("be.visible");
    cy.log("Country swithcer");
    cy.get(".region-nav").should("be.exist");
  });

  it("Verify nVent Home should load the footer.", () => {
    cy.visit("https://nvent.com/en-us/");
    cy.wait(5000);
    cy.log("Footer is visible");
    cy.get(".brand-footer__solutions > :nth-child(1) > .brand-footer__title")
      .should("be.visible")
      .and("have.text", "Our Brands");
  });

});
