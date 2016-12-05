import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';
import moment from 'moment';

let UserStory = function() {};

function USright(projectName){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa')
  || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right)
  throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}

UserStory.prototype.upsert = function(userstory, projectName) {

  PermissionsHelper.checkIfLogged();
  USright(projectName);

  check(userstory, {
    id: Number,
    description: String,
    effort: Number,
    priority: Number,
    color: String
  });

  if (userstory.id === 0){
    let userstories = Collections.UserStories.find({project: projectName}, {sort: {id: -1}}).fetch();
    userstory.id = (userstories.length > 0) ? userstories[0].id+1 : 1;
  }

  userstory.project = projectName;

  Collections.UserStories.upsert(
    {id: userstory.id},
    {$set: userstory
    });

    return 'user story updated';
  };

  UserStory.prototype.delete = function(_id){
    PermissionsHelper.checkIfLogged();

    Collections.UserStories.remove({_id});
    return 'user story deleted';
  };

  UserStory.prototype.upsertTrace = function(trace, projectName) {

    PermissionsHelper.checkIfLogged();
    USright(projectName);

    check(trace, {
      id: Number,
      trace: String
    });

    Collections.UserStories.upsert(
      {id: trace.id},
      {$set: {trace : {
        url: trace.trace,
        date : moment().format('DD-MMM-YYYY')
      }}
    });

    return 'trace updated';
  };

  UserStory.prototype.deleteTrace = function(_id) {

    PermissionsHelper.checkIfLogged();
    USright(projectName);

    Collections.UserStories.upsert(
      {_id: _id},
      {$unset: {trace : 1}}
    );

    return 'trace deleted';
  };

  UserStory.prototype.delete = function(_id){
    PermissionsHelper.checkIfLogged();

    Collections.UserStories.remove({_id});
    return 'user story deleted';
  };

  export default new UserStory();
