Feature: User Stories

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  @task1Exist
  @task2Exist
  Scenario: add an dependency
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the tasksdependencies menu button
  And I see the "Tasks Dependencies" page
  When I create a dependency
  Then I see the dependency

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  @task1Exist
  @task2Exist
  @dependency1Exist
  Scenario: delete an dependency
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the tasksdependencies menu button
  And I see the "Tasks Dependencies" page
  Then I see the dependency
  When I click on the dependency delete button
  Then I dont see the dependency
