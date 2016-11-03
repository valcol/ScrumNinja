Feature: Manage a project & it members

	Scenario: create a project
	Given I am on my own Projects page
	 When I click on "Create a Project"
	 Then it open the newproject page
	 When I put "mon premier projet" in the "Name" field 
	  And I put "10/01/2017" in the "Start" field
	  And I put "10/03/2017" in the "End" field
	  And I choose "Public" in the "Visibility level" field
	  And I put "a good project" in the "Description" field
	  And I click on "Submit"
	 Then I came back to my Projects page where my new project appears
	
	Scenario: add members
	Given I am on my own Projects page and the member rogert@gmail.com exist
	 When I click on "Add member" 
	 Then it open a popup
	 When I put "rogert@gmail.com"
	  And I put "Developer" to the "Role" field
	  And I click on "Ask"
	 Then it ask to this membership to join this project 
	  And I came back to the Projects page
		
	Scenario: Change a member grade
	Given I am on my own Projects page, the member rogert@gmail.com exist and is a member of one of my projects
	 When I click on "rogert@gmail.com" modify button
	 Then it open a popup 
	 When I click on "Process Owner"
	  And I click on "Change"
	 Then I came back to my Projects page and rogert@gmail is a Process Owner
	
	Scenario: delete a member
	Given I am on my own Projects page, the member rogert@gmail.com exist and is a member of one of my projects
	 When I click on "rogert@gmail.com" delete button
	 Then rogert@gmail is no more a member of this project
	
	Scenario: delete a project
	Given I am on my own Projects page
	 When I click on "mon premier projet" delete button
	 Then this project is no more present my projects list.