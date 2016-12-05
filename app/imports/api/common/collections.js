import { Mongo } from 'meteor/mongo';
import toposort from 'toposort';
import update from 'react-addons-update'; // ES6

CollectionsObj = {};

CollectionsObj.Specifications = new Meteor.Files({
  debug: true,
  collectionName: 'Specifications',
  allowClientCode: true, // Disallow remove files from Clien
  storagePath : '/data/Meteor/uploads/',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in pdf formats
    if (file.size <= 1024*1024*10 && /pdf/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload pdf, with size equal or less than 10MB';
    }
  }
});

CollectionsObj.Projects = new Mongo.Collection('projects');

CollectionsObj.Requirements = new Mongo.Collection('requirements');

CollectionsObj.UserStories = new Mongo.Collection('userstories');

CollectionsObj.Sprints = new Mongo.Collection('sprints');

CollectionsObj.Tasks = new Mongo.Collection('tasks');

CollectionsObj.TasksDependencies = new Mongo.Collection('tasks.dependencies');

CollectionsObj.TasksOrders = new Mongo.Collection('tasks.orders');

CollectionsObj.BurndownChart = new Mongo.Collection('burndownChart');

CollectionsObj.Commits = new Mongo.Collection('commits');

//Hooks
CollectionsObj.UserStories.after.remove(function (userId, doc) {
  let userstory = doc;
  let toUpdate = CollectionsObj.Tasks.find({userstory:userstory.id, project: userstory.project}).fetch();
  for (task of toUpdate) {
    if (task.userstory.length > 1)
    CollectionsObj.Tasks.update({_id:task._id}, {$pull : {userstory : userstory.id}});
    else
    CollectionsObj.Tasks.remove({_id:task._id});
  }
});

CollectionsObj.Tasks.after.remove(function (userId, doc) {
  let task = doc;
  let toUpdate = CollectionsObj.TasksDependencies.find({edge:task.id, project: task.project}).fetch();
  let l = [];
  let r = [];
  for (dep of toUpdate){
    if (dep.edge[0]===task.id)
    r.push(dep.edge[1]);
    else
    l.push(dep.edge[0]);
    CollectionsObj.TasksDependencies.remove({_id:dep._id});
  }

  for (lx of l){
    for (rx of r){
      CollectionsObj.TasksDependencies.upsert(
        {edge: [lx, rx],
          project: task.project},
          {$set: {
            edge: [lx, rx],
            project: task.project
          }
        });
      }
    }

    let dependencies = CollectionsObj.TasksDependencies.find({project: task.project}).fetch();
    let edges = [];
    for (dep of dependencies) {
      edges.push(dep.edge);
    }

    let list = [];
    try {
      list = toposort(edges);
    } catch (e) {
      throw new Meteor.Error(e.message);
    }

    let order = {
      list,
      project: task.project
    };

    CollectionsObj.TasksOrders.upsert(
      {project: task.project},
      {$set: order
      });

    });

  CollectionsObj.Projects.after.insert(function(userId, doc){
      let project = doc;
      CollectionsObj.BurndownChart.insert({
        nbSprint : 0,
        planned : [0],
        actual : [0],
        plannedBySprint : [0],
        project : project.name
      });

    }
  );
  CollectionsObj.UserStories.before.remove(function(userId, doc){
    let us = doc;
    let sprints = CollectionsObj.Sprints.find({project: us.project}).fetch();
    let bc = CollectionsObj.BurndownChart.findOne({project: us.project});

    let currentSprint = null;
    let nbSp =0;
    let EffortSprint = 0;
    let actual= bc.actual;
    let plannedBySprint=bc.plannedBySprint;
    let planned = bc.planned;
    if(sprints)
    for (sprint of sprints){
      nbSp++;
      EffortSprint = bc.plannedBySprint[nbSp];
      currentSprint = sprint;
      if (currentSprint)
      for (usId of currentSprint.userstory){
        if ((us.id === usId)){
          actual =update(actual,{$merge:{0: actual[0] - us.effort}});
          planned =update(planned,{$merge:{0 : planned[0] - us.effort}});
          EffortSprint -=us.effort;
        }
      }
      plannedBySprint = update(plannedBySprint,{$merge:{nbSp : EffortSprint}});
    }
    CollectionsObj.BurndownChart.update(bc._id,{
      $set: {
        planned : planned,
        actual : actual,
        plannedBySprint : plannedBySprint
      }
    });

  });

  CollectionsObj.UserStories.after.update(function(userId, doc){
    let us = doc;
    let sprints = CollectionsObj.Sprints.find({project: us.project}).fetch();
    let bc = CollectionsObj.BurndownChart.findOne({project: us.project});

    let currentSprint = null;
    let nbSp =0;
    let EffortSprint = 0;
    let actual= bc.actual;
    let plannedBySprint=bc.plannedBySprint;
    let planned = bc.planned;
    if(sprints)
    for (sprint of sprints){
      nbSp++;
      EffortSprint = bc.plannedBySprint[nbSp];
      currentSprint = sprint;
      if (currentSprint)
      for (usId of currentSprint.userstory){
        if ((us.id === usId)){
          actual = update(actual ,{$merge:{0: actual[0] + us.effort}});
          planned=update(planned,{$merge:{0 : planned[0] + us.effort}});
          EffortSprint +=us.effort;
        }
      }
      plannedBySprint = update(plannedBySprint,{$merge:{nbSp : EffortSprint}});
    }
    CollectionsObj.BurndownChart.update(bc._id,{
      $set: {
        planned : planned,
        actual : actual,
        plannedBySprint : plannedBySprint
      }
    });

  });

  CollectionsObj.Sprints.after.insert(function(userId, doc){
    let sprint = doc;
    let us = CollectionsObj.UserStories.find({project: sprint.project}).fetch();
    let bc = CollectionsObj.BurndownChart.findOne({project: sprint.project});

    let nbSp = bc.nbSprint +1;
    let actual= bc.actual;
    let plannedBySprint=bc.plannedBySprint;
    let planned = bc.planned;
    let  EffortSprint = 0;
    let i =0;
    for (usId of sprint.userstory){
      for(u of us){
        if ((u.id === usId)){
          console.log(actual);
          EffortSprint +=u.effort;
          for(i=0; i <=bc.nbSprint ; i++){
            console.log(i);
            let selector = {
              $merge:{}
            };
            selector['$merge'][i] = actual[i] + u.effort;
            actual = update(actual ,selector);
            selector['$merge'][i] = planned[i] + u.effort;
            planned = update(planned, selector);
            console.log(actual);
          }
        }
      }
    }
    plannedBySprint.push(EffortSprint);
    actual.push(actual[0]);
    planned.push(planned[nbSp-1] - EffortSprint);

    CollectionsObj.BurndownChart.update(bc._id, {
      $set :{
        nbSprint : nbSp,
        planned : planned ,
        actual : actual,
        plannedBySprint : plannedBySprint
      }
    });
  });
  CollectionsObj.Sprints.before.remove(function(userId, doc){
      let sprint = doc;
      let us = CollectionsObj.UserStories.find({project: sprint.project}).fetch();
      let bc = CollectionsObj.BurndownChart.findOne({project: sprint.project});
      let nbSp = bc.nbSprint;
      if(nbSp > 0){
      nbSp--;
      let actual= bc.actual;
      let plannedBySprint=bc.plannedBySprint;
      let planned = bc.planned;
      let  EffortSprint = 0;
      for (usId of sprint.userstory){
        for(u of us){
          if ((u.id === usId)){
            actual =update(actual, {$merge:{0: actual[0] - u.effort}});
            planned = update(planned, {$merge:{0 : planned[0] - u.effort}});
            EffortSprint -=u.effort;
          }
        }
      }
      actual =update(actual, {$merge:{0: actual[0] - u.effort}});
      planned = update(planned, {$merge:{0 : planned[0] - u.effort}});
      plannedBySprint = update(plannedBySprint,{$merge:{nbSp , EffortSprint}});
      CollectionsObj.BurndownChart.update(bc._id, {
        $set :{
          nbSprint : nbSp,
          planned : planned ,
          actual : actual,
          plannedBySprint : plannedBySprint
        }
      });
    }
    });



  export const Collections = CollectionsObj;
