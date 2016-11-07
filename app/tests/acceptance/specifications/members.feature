Feature: manage members

	Scenario: add members
		Given I visit my own Projects page 
		Given the member rogert@gmail.com exist
		Given the project "firstproject" exist
		 When I click  to "addmember"
		 Then it open the addmember page
		 When I put "rogert@gmail.com"
		 When I put "Developer" to the "Role" field
		 When I click on "Ask"
		 Then it ask to this membership to join this project 
		 Then I came back to the Projects page
		
	Scenario: Change a member grade
		Given I visit my own Projects page 
		Given the member rogert@gmail.com exist and is member of a projects
		 When I click on "rogert@gmail.com" modify button
		 Then it open a popup 
		 When I click on "Process Owner"
		 When I click on "Change"
		 Then I came back to my Projects page and rogert@gmail is a Process Owner
	
	Scenario: delete a member
		Given I am on my own Projects page
		Given the member rogert@gmail.com exist and is member of a projects
		 When I click on "rogert@gmail.com" delete button
		 Then rogert@gmail is no more a member of this project