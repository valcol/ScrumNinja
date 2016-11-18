Feature: Requirements

  @user1Exist
  @user1Logged
  @projectExist
  Scenario: add a requirement functional
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the requirements menu button
  And I see the "Requirements" page
  When I create a functional requirement named "r1"
  Then I see the "functional" requirement named "r1"

	@user1Logged
	@projectExist
  @user1Exist
  Scenario: add a requirement nonfunctional
  And I have a project named "project"
  And I click on the project dashboard button
  Given I am connected as "user1"
  And I see the "Dashboard" page
  And I click on the requirements menu button
  And I see the "Requirements" page
  When I create a non functional requirement named "r2"
  Then I see the "non functional" requirement named "r2"


	@user1Logged
	@projectExist
  @user1Exist
  @requirementExist
  Scenario: delete a requirement
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the requirements menu button
  And I see the "Requirements" page
  And I see the "functional" requirement named "requirement1"
  When I click on the requirement delete button
  Then I dont see the requirement
