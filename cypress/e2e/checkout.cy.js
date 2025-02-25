import '../support/commands';

describe('Inventory Test Suite', () => {

  beforeEach(() => {
    cy.clearCookies();  //ensure an empty cart, preventing test failure from leftover items.
    cy.visit('https://www.saucedemo.com/');
    cy.loginWithRole('standard');
    cy.url().should('include', '/inventory');
  });
/*
  afterEach(() => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });
*/
  it('should do checkout successfully', () => {
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    cy.get('[data-test="shopping-cart-link"]').click();
  });

});