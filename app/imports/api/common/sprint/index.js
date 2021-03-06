import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';
import toposort from 'toposort';
import moment from 'moment';

let Sprint = function() {};

function USright(projectName){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa')
  || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right)
  throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}
Sprint.prototype.add = function(sprint, projectName) {
  PermissionsHelper.checkIfLogged();
  USright(projectName);

  NonEmptyArrayOfNumbers = Match.Where(function (x) {
    check(x, [Number]);
    return x.length > 0;
  });

  check(sprint, {
    _id: String,
    start: String,
    end: String,
    description: String,
    userstory: NonEmptyArrayOfNumbers
  });

  for (id of sprint.userstory){
    let us = Collections.UserStories.findOne({project: projectName, id});
    if(!us)
    throw new Meteor.Error('Please select an US');
  }

  if(!moment(sprint.start).isValid() || !moment(sprint.end).isValid())
  throw new Meteor.Error('date format unsupported');

  if(moment(sprint.start).isAfter(sprint.end))
  throw new Meteor.Error('start date must be before end date');

  sprint.project = projectName;
  sprint.state = 0;
  if(sprint._id === '')
  {
    delete sprint._id;
    Collections.Sprints.insert(sprint);
  }
  else
  {
    Collections.Sprints.update(
      {_id : sprint._id},
      {$set: sprint},
      {upsert:true}
    );
  }
  return 'Sprint created';
};

Sprint.prototype.delete = function(_id){
  PermissionsHelper.checkIfLogged();
  // PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  Collections.Sprints.remove({
    _id
  });

  return 'Sprint deleted';
};

export default new Sprint();
