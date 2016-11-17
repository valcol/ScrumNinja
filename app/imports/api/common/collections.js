import { Mongo } from 'meteor/mongo';
import toposort from 'toposort';

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
    console.log(dep.edge);
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

export const Collections = CollectionsObj;
