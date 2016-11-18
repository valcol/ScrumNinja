Feature: Projects

	@user1Exist
	@user1Logged
	Scenario: Make a new project
		Given I am connected as "user1"
		And I visit "http://localhost:3000/u/newproject"
		When I create a project named "testproject"
		Then I visit "http://localhost:3000/u/projects"
		Then I see the project named "testproject"

	@user1Exist
	@user1Logged
	@projectExist
	Scenario: Delete a project
		Given I am connected as "user1"
		And I have a project named "project"
		And I visit "http://localhost:3000/u/projects"
		When I click on the project delete button
		Then I dont see the project

	@user1Exist
	@user1Logged
	@projectExist
	Scenario: Go to a project dashboard
		Given I am connected as "user1"
		And I have a project named "project"
		When I click on the project dashboard button
		Then I see the "Dashboard" page
