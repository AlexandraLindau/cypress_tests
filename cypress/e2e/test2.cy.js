/// <reference types="Cypress" />

describe('Test Suite', function () {

    it('Test case title 1', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.get('.products').find('.product').each(($el, index, $list) => {

            const vegName = $el.find('h4.product-name').text()
            if (vegName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
        }
    })

        cy.get('.cart-icon > img').click()
        cy.get('p.product-name:visible').should('include.text', 'Cashews')
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        
    })

})