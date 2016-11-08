Feature: Authentication

	Scenario: Register
		Given I am on the login page
		When I register as "user1"
		Then I am connected as "user1"

	@user1Exist
	Scenario: Login
		Given I am on the login page
		When I login as "user1"
		Then I am connected as "user1"

	@user1Exist
	@user1Logged
	Scenario: Loggout
		Given I am connected as "user1"
		When I click on the logout button
		Then I see the login screen
