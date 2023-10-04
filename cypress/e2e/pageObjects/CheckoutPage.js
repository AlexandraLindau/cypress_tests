class CheckoutPage {
    
    getCheckoutButton() {
        return cy.get(':nth-child(4) > :nth-child(5) > .btn')
    }

    selectCountry(country) {
        cy.get('#country').type(country)
        cy.get('.suggestions > ul > li > a',{ timeout: 10000 }).click()
    }

    acceptTermsAndConditions() {
        cy.get('#checkbox2').check({force: true})
    }

    getPurchaseButton() {
        return cy.get('.ng-untouched > .btn')
    }

    getAlert() {
        return cy.get('.alert')
    }
}

export default CheckoutPage;