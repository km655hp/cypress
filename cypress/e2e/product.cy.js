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

  it('should add and remove product successfully from product list page', () => {
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  });

  it('should add and remove product successfully from product detail page', () => {
    cy.get('#item_4_title_link').click();
    cy.url().should('include', '/inventory-item');
    cy.get('#add-to-cart').click();
    cy.get('#add-to-cart').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    cy.get('#remove').click();
    cy.get('#remove').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    cy.get('#back-to-products').click();
    cy.url().should('include', '/inventory');
  });

  it('should add and remove product successfully from my cart page', () => {
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('#continue-shopping').click();
  });
});