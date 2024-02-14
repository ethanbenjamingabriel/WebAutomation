describe('login to Script Runner Site', () => {

  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
  });

  it('Successful login', () => {
    cy.url().should('eq', 'https://staging.script-runner.com/');
    cy.get('[alt="script runner logo"]').should('be.visible');
    cy.get('button').should('be.visible').contains('Login').click();

    cy.origin('https://script-runner.us.auth0.com/', () => {
      cy.get('.auth0-lock-name').invoke('text').should('eq', 'Script Runner Login');

      cy.fixture('user').then((user) => {
        cy.get('#1-email').should('be.visible').type(user.username);
        cy.get('#1-password').should('be.visible').type(user.password);
      });

      cy.get('a[href*="#"]').invoke('text').should('eq', 'Don\'t remember your password?');
      cy.get('#1-submit').should('be.visible').click();
    });

    cy.url().should('include', 'dashboard');
  });

  it('Wrong Email login', () => {
    cy.url().should('eq', 'https://staging.script-runner.com/');
    cy.get('[alt="script runner logo"]').should('be.visible');
    cy.get('button').should('be.visible').contains('Login').click();

    cy.origin('https://script-runner.us.auth0.com/', () => {
      cy.get('.auth0-lock-name').invoke('text').should('eq', 'Script Runner Login');

      cy.fixture('user').then((user) => {
        cy.get('#1-email').should('be.visible').type("test@script-runner.com");
        cy.get('#1-password').should('be.visible').type(user.password);
      });

      cy.get('a[href*="#"]').invoke('text').should('eq', 'Don\'t remember your password?');
      cy.get('#1-submit').should('be.visible').click();
      cy.get('.auth0-global-message').invoke('text').should('eq', 'Wrong email or password.');

      cy.fixture('user').then((user) => {
        cy.get('#1-email').should('be.visible').clear().type(user.username);
      });

      cy.get('#1-submit').should('be.visible').click();
    });

    cy.url().should('include', 'dashboard');
  });

  it('Wrong Password login', () => {
    cy.url().should('eq', 'https://staging.script-runner.com/');
    cy.get('[alt="script runner logo"]').should('be.visible');
    cy.get('button').should('be.visible').contains('Login').click();

    cy.origin('https://script-runner.us.auth0.com/', () => {
      cy.get('.auth0-lock-name').invoke('text').should('eq', 'Script Runner Login');

      cy.fixture('user').then((user) => {
        cy.get('#1-email').should('be.visible').type(user.username);
        cy.get('#1-password').should('be.visible').type("testPassword");
      });

      cy.get('a[href*="#"]').invoke('text').should('eq', 'Don\'t remember your password?');
      cy.get('#1-submit').should('be.visible').click();
      cy.get('.auth0-global-message').invoke('text').should('eq', 'Wrong email or password.');

      cy.fixture('user').then((user) => {
        cy.get('#1-password').should('be.visible').clear().type(user.password);
      });

      cy.get('#1-submit').should('be.visible').click();
    });

    cy.url().should('include', 'dashboard');
  });

  it('Forgot Password login', () => {
    cy.url().should('eq', 'https://staging.script-runner.com/');
    cy.get('[alt="script runner logo"]').should('be.visible');
    cy.get('button').should('be.visible').contains('Login').click();

    cy.origin('https://script-runner.us.auth0.com/', () => {
      cy.get('a[href*="#"]').invoke('text').should('eq', 'Don\'t remember your password?');
      cy.get('a[href*="#"]').click();

      cy.get('.auth0-lock-header-welcome').invoke('text').should('eq', 'Reset your password');
      cy.get('.auth0-lock-body-content').invoke('text').should('include', 'Please enter your email address. We will send you an email to reset your password.');
      cy.get('.auth0-lock-input-email').should('be.visible');

      cy.fixture('user').then((user) => {
        cy.get('#1-email').should('be.visible').type(user.username);
      });

      cy.get('#1-submit').should('be.visible');
    });
  });

});