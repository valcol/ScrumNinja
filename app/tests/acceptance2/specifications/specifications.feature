Feature: Specifications

	@user1Exist
	@user1Logged
	@projectExist
	Scenario: Upload a file
		Given I am connected as "user1"
		And I have a project named "project"
		And I click on the project dashboard button
		And I see the "Dashboard" page
		And I click on the specifications menu button
		And I see the "Specifications" page
		When I select the file "C:\data\Meteor\test.pdf"
		Then I see the file "test.pdf" in the list
		When I click on the view button
		Then I see the PDF
