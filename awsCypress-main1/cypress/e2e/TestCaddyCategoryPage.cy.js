describe('Caddy Home And Category Page.', () => {
  it('Verify Caddy Home', () => {
    cy.visit('https://nvent.com/en-us/caddy');
    cy.wait(5000);
    cy.log("caddy Logo is visible");
    cy.get(".logo__img").should("be.visible");
     cy.log("Coveo is visible");
    cy.get(".magic-box-input > input").should("be.visible");
     cy.log("caddy footer is visible");
    cy.get(".brand-footer__companyinfo > :nth-child(1) > .brand-footer__title").invoke('text').then((text) => {
      cy.wrap(text.trim()).should('include', "Company Information");
    });
  });
it("Verify Caddy Category page Home", () => {
  cy.visit("https://nvent.com/en-us/caddy");
  cy.wait(5000);
  cy.contains("Products").click();
  cy.contains("Cable/Conduit").click();
  cy.wait(2000);
  cy.contains("Beam").click();
  cy.wait(7000);
  cy.get("div.facets-pills-wrapper>ul:nth-child(1)>li>a").should("be.visible");
  cy.get(".category-listing > :nth-child(1)").should("be.visible");
  cy.get(".counters > h2").should("be.visible");
    });
});  

