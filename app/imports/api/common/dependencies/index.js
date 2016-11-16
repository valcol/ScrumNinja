import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';
import toposort from 'toposort';

let Dependencies = function() {};

function USright(projectName){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa')
              || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right)
    throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}


Dependencies.prototype.upsert = function(dependency, projectName){

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

Dependencies.prototype.remove = function(_id, projectName){
  PermissionsHelper.checkIfLogged();

  Collections.TasksDependencies.remove({_id});

  let dependencies = Collections.TasksDependencies.find({project: projectName}).fetch();
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
    project: projectName
  };

  Collections.TasksOrders.upsert(
    {project: projectName},
    {$set: order
  });

  return 'dependency deleted';
};

export default new Dependencies();
