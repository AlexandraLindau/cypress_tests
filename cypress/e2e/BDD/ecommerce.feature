Feature: E2E e-commerce validation

        application regression
        Scenario: E-commerce product delivery
        Given I open an e-commerce page
        When I add items to chart
        And Validate the total prices
        Then Select the country submit and verify thank you

        Scenario: Fill in the form to shop
        Given I open an e-commerce page
        When I filled in the form details
             | name | gender |
             | Alex | female |
        And Validate the form behaviour
        Then Select the Shop page
