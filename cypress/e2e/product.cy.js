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
    cy.addProduct();
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it('should add and remove product successfully from product detail page', () => {
    cy.get('#item_4_title_link').click();
    cy.url().should('include', '/inventory-item');
    cy.get('#add-to-cart').click();
    cy.get('#add-to-cart').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text','1');
    cy.get('#remove').click();
    cy.get('#remove').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('#back-to-products').click();
    cy.url().should('include', '/inventory');
  });

  it('should add and remove product successfully from my cart page', () => {
    cy.addProduct();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('#continue-shopping').click();
  });
/*
  //works only when product's names and prices are known and wont change
  it('should filter products and check their order', () => {
    cy.get('[data-test="product-sort-container"]').select('az');
    cy.get('[data-test="inventory-item-name"]').first().should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="inventory-item-name"]').last().should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('[data-test="inventory-item-name"]').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    cy.get('[data-test="inventory-item-name"]').last().should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('[data-test="inventory-item-price"]').first().should('have.text', '$7.99');
    cy.get('[data-test="inventory-item-price"]').last().should('have.text', '$49.99');
    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.get('[data-test="inventory-item-price"]').first().should('have.text', '$49.99');
    cy.get('[data-test="inventory-item-price"]').last().should('have.text', '$7.99');
  });
*/

  //works even if product's names and prices change 
  it('should filter products and check their order', () => {
    //sorting names A-Z
    cy.get('[data-test="product-sort-container"]').select('az');
    cy.get('[data-test="inventory-item-name"]').then(($products) => {
      const names = $products.toArray().map(el => el.innerText);
      expect(names).to.deep.equal([...names].sort());
    });
    //sorting names Z-A
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('[data-test="inventory-item-name"]').then(($products) => {
      const names = $products.toArray().map(el => el.innerText);
      expect(names).to.deep.equal([...names].sort().reverse());
    });
    //sorting prices low to high
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const price = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));
      expect(price).to.deep.equal([...price].sort((a, b) => a - b));
    });
    //sorting prices high to low
    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const price = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));
      expect(price).to.deep.equal([...price].sort((a, b) => b - a));
    });
  });
  
});