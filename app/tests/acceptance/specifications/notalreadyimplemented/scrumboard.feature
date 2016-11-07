Feature: Manage Scrumboard

	Scenario: move a task from ToDo to InGoing
		Given I visit the scrumboard page
		Given it have a task into ToDo column
		When I pick the task and drop it
		 Then the task stay on the column
		 Then my name is linked to the task

	Scenario: move a task from OnTest to Done
		Given I visit the scrumboard page
		Given it have a task into OnTEst column
		 When I pick the task and drop it
		 Then the task stay on the column
		 Then it open a popup
		 When i put "" in the "" field #commit
		 When I click on "" #submit
		 Then the tracability of this task is added

	Scenario: a retarded task is enhanced
		Given I visit the scrumboard page
		Given it have a retarded task
		Then a see if this task is enhanced
