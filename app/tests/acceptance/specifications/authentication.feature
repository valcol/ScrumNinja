Feature: Authentication

	Scenario: Sign Up
		Given My browser is empty
		When I visit the Home page
		 And I click on "Register a new membership"
		Then it open the SignUp page
		When I put "Léon Lipwig" in the field "full name"
		 And I put "llipwig@laposte.net" in the field "Email"
		 And I put "leo" in the field "Password"
		 And I put "leo" in the field "retype password"
		 And I click on "Submit"
		Then I directly go to my own projects page.
		 
	Scenario: Sign In
		Given I visit the Home page
		When I put "llipwig@laposte.net" in the field "Email"
		 And I put "leo" in the field "Password"
		 And I click on "Sign In"
		Then I go to my own projects page.