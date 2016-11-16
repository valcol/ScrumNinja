import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';
import toposort from 'toposort';

let Tasks = function() {};

function USright(projectName){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa')
              || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right)
    throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}

Tasks.prototype.upsert = function(task, projectName) {

  PermissionsHelper.checkIfLogged();
  USright(projectName);

  NonEmptyArrayOfNumbers = Match.Where(function (x) {
    check(x, [Number]);
    return x.length > 0;
  });

  check(task, {
    id: Number,
    description: String,
    userstory: NonEmptyArrayOfNumbers
  });

  for (id of task.userstory)
    if(!Collections.UserStories.findOne({id}))
      throw new Meteor.Error('Please select an US');

  if (task.id === 0){
    let tasks = Collections.Tasks.find({project: projectName}, {sort: {id: -1}}).fetch();
    task.id = (tasks.length > 0) ? tasks[0].id+1 : 1;
  }

  task.project = projectName;
  task.state = 0;

  Collections.Tasks.upsert(
    {id: task.id},
    {$set: task
    });

   return 'task updated';
};

Tasks.prototype.delete = function(_id){
  PermissionsHelper.checkIfLogged();

  Collections.Tasks.remove({_id});
  return 'task deleted';
};

Tasks.prototype.upsertDependency = function(dependency, projectName){

  ArrayOfNumbersSize2 = Match.Where(function (x) {
    check(x, [Number]);
    return x.length === 2;
  });

  check(dependency.edge, ArrayOfNumbersSize2);

  for (id of dependency.edge)
    if(!Collections.Tasks.findOne({id, project: projectName}))
      throw new Meteor.Error('Error');

  let dependencies = Collections.TasksDependencies.find({project: projectName}).fetch();
  let edges = [];
  for (dep of dependencies) {
    edges.push(dep.edge);
  }

  edges.push(dependency.edge);

  let list = [];
  try {
    list = toposort(edges);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }

  dependency.project = projectName;
  Collections.TasksDependencies.upsert(
    {edge: dependency.edge,
    project: projectName},
    {$set: dependency
  });

  let order = {
    list,
    project: projectName
  };

  Collections.TasksOrders.upsert(
    {project: projectName},
    {$set: order
  });


};

Tasks.prototype.removeDependency = function(_id){
  PermissionsHelper.checkIfLogged();

  Collections.TasksDependencies.remove({_id});
  return 'dependency deleted';
};

export default new Tasks();
