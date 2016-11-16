Feature: User Stories

  @user1Exist
  @user1Logged
  @projectExist
  Scenario: add an user story
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the userstory menu button
  And I see the "User Stories" page
  When I create a user story named "us1"
  Then I see the user story named "us1"

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  Scenario: change an user story
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the userstory menu button
  And I see the "User Stories" page
  And I see the user story named "us1"
  When I modify the user story named "us1"
  Then I see the user story named "us1" modified

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  Scenario: delete an user story
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the userstory menu button
  And I see the "User Stories" page
  And I see the user story named "us1"
  When I click on the userstory delete button
  Then I dont see the user story
