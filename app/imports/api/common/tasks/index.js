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

export default new Tasks();
