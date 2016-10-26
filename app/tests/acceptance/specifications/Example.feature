Feature: Describe the feature tested here

  Scenario: Go to the project page and select a project
    Given I have visited the application
    When I click on the project number "1"
    Then I see the message "Dashboard" inside "h3"
