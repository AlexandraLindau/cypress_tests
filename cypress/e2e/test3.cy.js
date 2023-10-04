/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Test Suite', function () {

    it('Checkbox test', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').check(['option1', 'option3'])
       
})

it('Static dropdown test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#dropdown-class-example').select('Option2').should('have.value', 'option2')
    cy.get('#dropdown-class-example').select('option1').should('have.value', 'option1').and('not.have.value', 'option2')
   
})

it('Dynamic dropdown test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#autocomplete').type('Bel')
    cy.get('.ui-menu-item div').each(($el, index, $list) => {
        if ($el.text() === 'Belarus') {
            $el.click()
        }
    })
    cy.get('#autocomplete').should('have.value', 'Belarus')
   
})

it('Invisible elements test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')
   
})

it('Radiobutton test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('[value="radio2"]').check().should('be.checked')
   
})

it('Popup test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#alertbtn').click()
    cy.get('[value="Confirm"]').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })

    cy.on('window:confirm', (str) => {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })

})

it('Switch tab test 1', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#opentab').should('have.attr', 'target')
    cy.get('#opentab').invoke('removeAttr', 'target')
    cy.get('#opentab').click()
    cy.origin('https://www.qaclickacademy.com/', () => {
        cy.url().should('include', 'qaclickacademy')
        cy.go('back')
    })
})

it('Switch tab test 2', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#opentab').should('have.attr', 'href')
    cy.get('#opentab').then(function(el) {
        const url = el.prop('href')
        cy.visit(url)
    })
    cy.origin('https://www.qaclickacademy.com/', () => {
        cy.get("div.sub-menu-bar a[href*='about']").click()
        cy.url().should('include', 'qaclickacademy')
    })
   
})

it('Web table test 1', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('table#product.table-display tr td:nth-child(2)').each(($el, index, $list) => {
        if ($el.text().includes('Appium')) {
            expect($el.next().text()).to.equal('30')
        }
    })

})

it('Web table test 2', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('table#product.table-display tr td:nth-child(2)').each(($el, index, $list) => {
        if ($el.text().includes('JMETER')) {
            cy.get('table#product.table-display tr td:nth-child(2)').eq(index).next().then(function(price) {
                expect(price.text()).to.equal('25')
            })
        }
    })

})

it('Mouse hover test 1', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include', 'top')

})

it('Mouse hover test 2', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.contains('Top').click({ force : true })
    cy.url().should('include', 'top')

})

it('Iframe test', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.frameLoaded('#courses-iframe')
    cy.iframe().find("ul.navigation a[href*='mentorship']").eq(0).click()
    cy.wait(3000)
    cy.iframe().find('div.pricing-container').should('have.length', 2)
    cy.iframe().find('div.pricing-container').find('h1.pricing-title').eq(0).then(function(el) {
        const expectedTitle1 = el.text()
        expect(expectedTitle1).to.equal('BRONZE')
    })
    

})

})