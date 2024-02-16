describe('Navigate Dashboard Features', () => {

    beforeEach(() => {
      cy.viewport('macbook-13');
      cy.login('/dashboard');
    });
  
    it('Component Visibility', () => {
        cy.get('[alt="script runner logo"]').should('be.visible');
        cy.get('.jss5').should('be.visible');
        cy.fixture('user').then((user) => {
            cy.get('.MuiTypography-body1').should('be.visible').invoke('text').should('include', user.username);
        });
        cy.get('.jss7').should('be.visible');

        cy.get('.jss12.MuiTypography-h1').invoke('text').should('eq', 'Start New Delivery');
        cy.get('.MuiTypography-body1').invoke('text').should('include', 'Select a delivery date then scan the barcode and customer information for each new order.');
        cy.get('.MuiButton-label').should('be.visible');

        cy.get('.MuiTableRow-head').invoke('text')
            .should('include', 'Date')
            .should('include', 'Delivery Number')
            .should('include', '# of Orders')
            .should('include', 'Driver')
            .should('include', 'Status')
            .should('include', 'Returns');
    });

    it('Buttons & Dropdown Menu Functionality', () => {
        /*
        cy.get('.jss25').should('be.visible').click({ force: true });
        cy.get('.MuiMenu-list').invoke('text')
            .should('include', 'All')
            .should('include', 'Future')
            .should('include', 'Present')
            .should('include', 'Past');
        */
        
        cy.get('.jss7').should('be.visible').click();
        cy.get('.MuiMenu-list').its('length').should('eq', 1);
        cy.get('.MuiMenu-list').invoke('text').should('eq', 'Cards on FileLog out');
        cy.get('.jss4').should('be.visible');
        cy.get('.jss3').should('be.visible');

        cy.get('.jss26').first().should('be.visible').click({ force: true });
        cy.get('.MuiPickersBasePicker-container').should('be.visible');
        cy.get('.jss26').last().should('be.visible').click({ force: true });
        cy.get('.MuiPickersBasePicker-container').should('be.visible');

        cy.get('.MuiOutlinedInput-input').last().should('be.visible').type('test', { force: true });
        cy.get('.jss39').click({ force: true });
        cy.get('.jss39').click({ force: true });
    });

    it('Opening Delivery', () => {
        var date, deliveryNumber, numOrders, driver, status = '';

        cy.get('.jss43').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                cy.get('.jss43').eq(i).children().eq(0).invoke('text').then((val1) => {
                    date = val1;
                    cy.get('.jss43').eq(i).children().eq(1).invoke('text').then((val2) => {
                        deliveryNumber = val2;
                        cy.get('.jss43').eq(i).children().eq(2).invoke('text').then((val3) => {
                            numOrders = val3;
                            cy.get('.jss43').eq(i).children().eq(3).invoke('text').then((val4) => {
                                driver = val4;
                                cy.get('.jss43').eq(i).children().eq(4).invoke('text').then((val5) => {
                                    status = val5;
                                    cy.get('.jss43').eq(i).click();
                                    if(status != 'Draft Delivery' && driver.length > 1) {
                                        cy.get('.MuiPaper-elevation1').invoke('text').should('include', `Delivery Date: ${date}`);
                                        cy.get('.MuiPaper-elevation1').invoke('text').should('include', `Driver: ${driver}`);
                                    }
                                    cy.url().should('include', `/dashboard/delivery/${deliveryNumber}`);
                                    cy.get('.MuiTypography-root.MuiTypography-body2').invoke('text').should('include', `Orders: ${numOrders}`);
                                });
                            });
                        });
                    });
                });
                cy.get('button').eq(2).click();
                cy.reload();
            }
        });
    });

});