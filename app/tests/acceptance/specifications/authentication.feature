Feature: Authentication

	Scenario: Sign Up
		Given I visit the homepage
		 When I click on sign up link
		 Then I open the sign up page
		 When I put sign up fields
		 Then I visit my own projects page
		 
	Scenario: Sign In
		Given I visit my own projects page
		 When I sign out
		 Then I visit the homepage
		 When I put sign in fields
		 Then I visit my own projects page