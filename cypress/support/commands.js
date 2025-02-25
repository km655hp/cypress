Cypress.Commands.add('loginWithRole', (role) => {
    cy.fixture('users').then((users) => {
    console.log('Loaded users:', users); // Debugging: Check if users are loaded properly
    const user = users.find((u) => u.role === role);
    if (!user) {
      throw new Error(`No user found with role: ${role}`);
    }
    console.log('Logging in as:', user.username); // Debugging: See which user is selected
    cy.get('#user-name').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login-button').click();
  });
})

Cypress.Commands.add('addProduct', () => {
  cy.get('#add-to-cart-sauce-labs-backpack').click();
  cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
  cy.get('[data-test="shopping-cart-badge"]').should('have.text','1');
})

Cypress.Commands.add('addMultipleProducts', (number) => {
  for (let i = 0; i < number; i++) { 
    cy.get('.btn_inventory').contains('Add to cart').click();
  }
  cy.get('[data-test="shopping-cart-badge"]').should('have.text', number);
})