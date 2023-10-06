/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../support/pageObjects/HomePage"
import ProductsPage from "../../../support/pageObjects/ProductsPage"
import CheckoutPage from "../../../support/pageObjects/CheckoutPage"

const homePage = new HomePage();
const productsPage = new ProductsPage();
const checkoutPage = new CheckoutPage();

Given('I open an e-commerce page', () => {
    cy.visit(Cypress.env('url'));
})

When('I add items to chart', () => {
    homePage.getShopButton().click()
    data.productNames.forEach((element) =>
    cy.selectProduct(element)
    )
})

When('Validate the total prices', () => {
    productsPage.getCheckoutButton().click()

    let total = 0;
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        const amount = $el.text();
        const amountWithoutCurrency = Number(amount.match(/-?\d+(\.\d+)?/g)[0]);
        cy.log(amountWithoutCurrency);
        total += amountWithoutCurrency;
      }).then(() => {
        cy.log(total);
      })
  
      cy.get('tr td:nth-child(5) strong').then((element) => {
        const totalAmount = element.text();
        const totalAmountWithoutCurrency = Number(totalAmount.match(/-?\d+(\.\d+)?/g)[0]);
        cy.log(totalAmountWithoutCurrency);
        expect(totalAmountWithoutCurrency).to.equal(total);
      })
})

Then('Select the country submit and verify thank you', () => {
    checkoutPage.getCheckoutButton().click()
    checkoutPage.selectCountry('Swe')
    checkoutPage.acceptTermsAndConditions()
    checkoutPage.getPurchaseButton().click()
    checkoutPage.getAlert().then((element) => {
      const actualText = element.text();
      expect(actualText.includes('Success! Thank you! Your order will be delivered in next few weeks :-).')).to.be.true;
    })
})

When('I filled in the form details', () => {
    homePage.getNameField().type(data.name)
    homePage.getGender().select(data.gender)
})

When('Validate the form behaviour', () => {
    homePage.getTwoWayBinding().should('have.value', data.name)
    homePage.getNameField().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneurRadioButton().should('be.disabled')
})

Then('Select the Shop page', () => {
    homePage.getShopButton().click();
})