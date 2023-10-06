class HomePage {

    getNameField() {
        return cy.get("input[name='name']:nth-child(2)")
    }

    getTwoWayBinding() {
        return cy.get("input[name='name']:nth-child(1)")
    }

    getGender() {
        return cy.get('#exampleFormControlSelect1')
    }

    getEntrepreneurRadioButton() {
        return cy.get('#inlineRadio3')
    }

    getShopButton() {
        return cy.get('a.nav-link[href="/angularpractice/shop"]')
    }

}

export default HomePage;