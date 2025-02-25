import '../support/commands';

describe('Inventory Test Suite', () => {

  beforeEach(() => {
    cy.clearCookies();  //ensure an empty cart, preventing test failure from leftover items.
    cy.visit('https://www.saucedemo.com/');
    cy.loginWithRole('standard');
    cy.url().should('include', '/inventory');
  });

  afterEach(() => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });

  it('should do checkout successfully', () => {
    cy.addProduct();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one');
    cy.get('#first-name').should('be.visible').type('Pirate');
    cy.get('#last-name').should('be.visible').type('Software');
    cy.get('#postal-code').should('be.visible').type('12345');
    cy.get('#continue').click();
    cy.url().should('include', '/checkout-step-two');
    cy.get('#finish').click();
    cy.url().should('include', '/checkout-complete');
    cy.get('#back-to-products').click();
    cy.url().should('include', '/inventory');
  });

  it('should validate your information input fields', () => {
    cy.addProduct();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one');
    cy.get('#continue').click();
    cy.get('[data-test="error"]').should('contain.text', 'Error: First Name is required');
    cy.get('#first-name').should('be.visible').type('Pirate');
    cy.get('#continue').click();
    cy.get('[data-test="error"]').should('contain.text', 'Error: Last Name is required');
    cy.get('#last-name').should('be.visible').type('Software');
    cy.get('#continue').click();
    cy.get('[data-test="error"]').should('contain.text', 'Error: Postal Code is required');
    cy.get('#postal-code').should('be.visible').type('12345');
    cy.get('[data-test="error-button"]').click().should('not.exist');
    cy.get('#continue').click();
    cy.url().should('include', '/checkout-step-two');
  });

  it('should cancel checkout successfully', () => {
    cy.addProduct();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one');
    cy.get('#cancel').click();
    cy.url().should('include', '/cart');
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one');
    cy.get('#first-name').should('be.visible').type('Pirate');
    cy.get('#last-name').should('be.visible').type('Software');
    cy.get('#postal-code').should('be.visible').type('12345');
    cy.get('#continue').click();
    cy.get('#cancel').click();
    cy.url().should('include', '/inventory');
  });

  it('should do checkout with multiple items successfully', () => {
    cy.addMultipleProducts('3');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one');
    cy.get('#first-name').should('be.visible').type('Pirate');
    cy.get('#last-name').should('be.visible').type('Software');
    cy.get('#postal-code').should('be.visible').type('12345');
    cy.get('#continue').click();
    cy.url().should('include', '/checkout-step-two');
    //TBD check total prize
    cy.get('#finish').click();
    cy.url().should('include', '/checkout-complete');
    cy.get('#back-to-products').click();
    cy.url().should('include', '/inventory');
  });

});