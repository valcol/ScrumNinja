Feature: Dashboard

	@user1Exist
	@user2Exist
	@user1Logged
	@projectExist
	Scenario: Add a member to a project # and change his role
		Given I am connected as "user1"
		And I have a project named "project"
		And I click on the project dashboard button
		And I see the "Dashboard" page
		When I add the member "user2" as an administrator
		Then I see the member "user2" as an administrator

	#@user1Exist
	#@user2Exist
	#@user1Logged
	#@projectExist
	#@user2AsMember
	#Scenario: delete a member from a project
	#	Given I am connected as "user1"
	#	And I have a project named "project"
	#	And I click on the project dashboard button
	#	And I see the "Dashboard" page
	#	When I click on the member delete button
	#	Then I dont see the member "user2"
