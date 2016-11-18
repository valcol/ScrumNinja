Feature: User Stories

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  Scenario: add an task
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the tasksmanagement menu button
  And I see the "Tasks Management" page
  When I create a task named "task1"
  Then I see the task named "task1"

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  @task1Exist
  Scenario: change an task
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the tasksmanagement menu button
  And I see the "Tasks Management" page
  Then I see the task named "task1"
  When I modify the task named "task1"
  Then I see the task named "task1" modified

  @user1Exist
  @user1Logged
  @projectExist
  @userstoryExist
  @task1Exist
  Scenario: delete an task
  Given I am connected as "user1"
  And I have a project named "project"
  And I click on the project dashboard button
  And I see the "Dashboard" page
  And I click on the tasksmanagement menu button
  And I see the "Tasks Management" page
  Then I see the task named "task1"
  When I click on the task delete button
  Then I dont see the task
