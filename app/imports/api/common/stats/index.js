import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';
import moment from 'moment';

let Stats = function() {};

Stats.prototype.process = function(projectName) {

  console.log('process stats..');

  let stats = Collections.Stats.findOne({project: projectName});
  let sprintsData  = {};
  let totalEffort = 0;
  let userstoriesData  = {};
  let sprintsEndEffort = {};
  if (stats) {
    sprintsEndEffort = stats.sprintsEndEffort;
  }

  let sprints = Collections.Sprints.find({project:projectName}).fetch();
  for (sprint of sprints){
    console.log('sprint');
    let userstories = Collections.UserStories.find({id:{$in:sprint.userstory}}).fetch();
    console.log(userstories);
    //
    let sprintDataObject = {};
    let usDone  = [];
    sprintDataObject.totalEffort = 0;
    sprintDataObject.currentEffort = 0;
    sprintDataObject.id = sprint._id;
    //
    for (userstory of userstories){
      console.log('us');
      let tasks = Collections.Tasks.find({userstory:userstory.id}).fetch();
      console.log(tasks);
      //
      let usDataObject = {};
      usDataObject.tasksNumber = 0;
      usDataObject.tasksDoneNumber = 0;
      usDataObject.effort = userstory.effort;
      usDataObject.us = userstory.id;
      //
      for (task of tasks){
        console.log('task');
        usDataObject.tasksNumber += 1;
        if (task.state === 4)
        usDataObject.tasksDoneNumber += 1;
      }

      if (usDataObject.tasksNumber === usDataObject.tasksDoneNumber){
        sprintDataObject.currentEffort += userstory.effort;
        usDone.push(userstory._id);
      }

      sprintDataObject.totalEffort += userstory.effort;

      userstoriesData[userstory.id] = usDataObject;
    }

    totalEffort += sprintDataObject.totalEffort;
    sprintsData[sprint._id]=sprintDataObject;

    if (moment(sprint.end).isBefore(moment())) {
      if (!sprintsEndEffort[sprint._id]){
        sprintsEndEffort[sprint._id] = {};
        sprintsEndEffort[sprint._id].usDone = usDone;
      }

      let currentEffort = 0;
      for (us of sprintsEndEffort[sprint._id].usDone){
        let userstoryDone = Collections.UserStories.findOne({_id:us});
        if (userstoryDone){
          let tasks = Collections.Tasks.find({userstory:userstoryDone.id}).fetch();
          let tasksNumber = 0;
          let tasksDoneNumber = 0;
          for (task of tasks){
            tasksNumber += 1;
            if (task.state === 4)
            tasksDoneNumber += 1;
          }
          if (tasksNumber === tasksDoneNumber){
            currentEffort += userstoryDone.effort;
          }
        }
        else {
          sprintsEndEffort[sprint._id].usDone.splice(usDone.indexOf(us), 1);
        }
      }

      sprintsEndEffort[sprint._id].effort = currentEffort;
    }
  }

  console.log('sprintsData'+JSON.stringify(sprintsData));
  console.log('totalEffort'+JSON.stringify(totalEffort));
  console.log('userstoriesData'+JSON.stringify(userstoriesData));
  console.log('sprintsEndEffort'+JSON.stringify(sprintsEndEffort));

  Collections.Stats.upsert(
    {project: projectName},
    {$set: {
      sprintsData,
      totalEffort,
      userstoriesData,
      sprintsEndEffort
    }
  });

};

export default new Stats();
