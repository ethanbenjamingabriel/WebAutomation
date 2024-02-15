describe('Test User Dropdown Items', () => {

    it('Log out of Script Runner from Dashboard', () => {
        cy.get('.jss7').should('be.visible').click();
        cy.get('.jss3').should('be.visible').click();
        cy.url().should('eq', 'https://staging.script-runner.com/');
        cy.get('[alt="script runner logo"]').should('be.visible');
        cy.get('button').should('be.visible').contains('Login');
    });

    it('Cards on File Page', () => {
        cy.get('.jss7').should('be.visible').click();
        cy.get('.jss4').should('be.visible').click();

        cy.url().should('include', 'settings/payment');
        cy.get('.MuiTypography-h1').invoke('text').should('eq', 'Cards on fileAdd new card');
        cy.get('[alt="Amex Icon"]').should('be.visible');
        cy.get('[alt="MasterCard Icon"]').should('be.visible');
        cy.get('[alt="Visa Icon"]').should('be.visible');

        cy.get('.MuiOutlinedInput-input').eq(0).type('Ethan Gabriel');
        cy.get('.MuiOutlinedInput-input').eq(1).type('Ethan');
        cy.get('.MuiOutlinedInput-input').eq(2).type('Gabriel');

        /*
        cy.get('#cardNumber-label').type(4537123412341234);
        cy.get('#expirationDate').type(1234);
        cy.get('#cvv').type(123);
        cy.get('#postalCode').type(12345);
        cy.get('.sq-card-message sq-visible sq-card-message-error').invoke('text').should('eq', 'Enter a valid card number.');
        */

        cy.get('.MuiIconButton-label').eq(2).should('be.visible').click();
        cy.get('.MuiButton-label').first().should('be.visible').invoke('text').should('eq', 'Cancel');
        cy.get('.MuiButton-label').last().should('be.visible').invoke('text').should('eq', 'Proceed');
        cy.get('.sc-ewvfhA.bLNHwQ').should('be.visible').invoke('text').should('eq', '+ Add new card');
    });

});