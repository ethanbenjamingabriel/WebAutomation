Cypress.Commands.add('login', (url) => {
    cy.visit(url);
    cy.origin('https://script-runner.us.auth0.com/', () => {
      cy.fixture('user').then((user) => {
        cy.get('#1-email').type(user.username);
        cy.get('#1-password').type(user.password);
      });
      cy.get('#1-submit').click();
    });
});