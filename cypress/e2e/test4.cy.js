/// <reference types="Cypress" />
import HomePage from "./pageObjects/HomePage"
import ProductsPage from "./pageObjects/ProductsPage"
import CheckoutPage from "./pageObjects/CheckoutPage"

describe('Test suite 2', function () {

  before(function() {
    cy.fixture('example').then(function(data) {
      globalThis.data = data
    })
  })

  beforeEach(function() {
    cy.visit(Cypress.env('url'));
  })

  it('Test validation', function () {
    const homePage = new HomePage()
    homePage.getNameField().type(data.name)
    homePage.getGender().select(data.gender)
    
    homePage.getTwoWayBinding().should('have.value', data.name)
    homePage.getNameField().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneurRadioButton().should('be.disabled')
  })

  it('Test buy product', function () {
    const homePage = new HomePage()
    homePage.getShopButton().click()

    data.productNames.forEach((element) =>
    cy.selectProduct(element)
    )

    const productsPage = new ProductsPage()
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

    const checkoutPage = new CheckoutPage()
    checkoutPage.getCheckoutButton().click()
    checkoutPage.selectCountry('Swe')
    checkoutPage.acceptTermsAndConditions()
    // checkoutPage.getPurchaseButton().click()
    checkoutPage.getAlert().then((element) => {
      const actualText = element.text();
      expect(actualText.includes('Success! Thank you! Your order will be delivered in next few weeks :-).')).to.be.true;
    })
  })

})