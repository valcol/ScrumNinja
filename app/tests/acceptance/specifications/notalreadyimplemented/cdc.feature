Feature: Manage specifications (Cahier des charges)

	Scenario: Add a new specification
		Given I visit my project page
		 When I open the specification page
		 When I click on ""                           #Upload a file
		 Then it open a popup page
		 When I choose a file
		 Then I see the message "File ... successfully uploaded"    # le nom dépend du fichier que tu vas choisir de tester
		 Then I see my new specification

	Scenario: view a specification
		Given I visit my project specification page
		 When I click on "" #view
		 Then it open a popup page
		 When I choose how read it                    #pas sûre qu'on puisse tester ca...
		 Then it open the file


	Scenario: delete a specification
		Given I visit my project specification page
		 When I click on ""                           #delete
		 Then the file disappear

