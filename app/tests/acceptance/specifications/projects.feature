Feature: Manage a project

	Scenario: create a project
		Given I visit my own projects page
	 	 When I click to create a project
	 	 Then it open the newproject page
	 	 When I put "monPremierProjet" in the "label + .form-control" field 
	 	 When I put "10/01/2017" in the ".start" field
	  	 When I put "10/03/2017" in the ".end" field
	 	 When I put "a good project" in the "textarea[class=\"form-control\"]" field
	 	 When I click on "button.btn:nth-child(8)"
		 Then I see the message "Project created" inside ".callout.callout-success"
	 	 When I click to my own projects page
	 	 Then my new project appears
	
	Scenario: delete a project
		Given I visit my own Projects page
	  	 When I click on ".btn.btn-flat.pull-right"
	 	 Then my project disappears