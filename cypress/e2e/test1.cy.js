/// <reference types="Cypress" />

describe('Test Suite', function () {

    it('Test case title 1', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('div.products .product:visible').should('have.length', 4)
        cy.get('.products').as('product_locator')
        cy.get('@product_locator').find('.product').should('have.length', 4)
        cy.get('@product_locator').find('.product').eq(2).contains('ADD TO CART').click().then(function(){
            console.log('wfwrefwre')
        })
        
    })

    it('Test case title 2', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')

        cy.get('.products').find('.product').each(($el, index, $list) => {

            const vegName = $el.find('h4.product-name').text()
            if (vegName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
        }
    })
    cy.get('.brand').should('have.text', 'GREENKART')

    cy.get('.brand').then(function(logo_element) {
        cy.log(logo_element.text())
    })
    
    })
})