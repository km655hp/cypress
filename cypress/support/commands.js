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