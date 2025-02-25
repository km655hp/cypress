import '../support/commands';

describe('Login Test Suite', () => {

  it('should log in successfully', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.loginWithRole('standard');
    cy.url().should('include', '/inventory');
  });

  it('should be locked out from logging in', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.loginWithRole('locked');
    cy.url().should('not.include', '/inventory');
    cy.get('[data-test="error"]').should('contain.text', 'locked out');
  });

  it('should be prevented from logging in', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.loginWithRole('wrong_user');
    cy.url().should('not.include', '/inventory');
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match');
    cy.loginWithRole('wrong_password');
    cy.url().should('not.include', '/inventory');
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match');
    //cy.get('.error-button').should('be.visible');
  });

});
