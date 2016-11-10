import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';

let UserStory = function() {};

function USright(projectName){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa')
              || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right)
    throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}

UserStory.prototype.add = function(id,description, effort,priority, projectName) {
  //let userstory = Collections.UserStories.find({project : projectName});
  PermissionsHelper.checkIfLogged(); //throw if not.
  USright(projectName);

  Collections.UserStories.insert({
    id,
    description,
    effort,
    priority,
    projectName
  });
   return 'user story created';
};

UserStory.prototype.update = function(idm,id,description, effort,priority, projectName) {
  //let userstory = Collections.UserStories.find({project : projectName});
  PermissionsHelper.checkIfLogged(); //throw if not.
  USright(projectName);

  Collections.UserStories.update({ project : projectName,  _id: idm})(
    {$set: {
      id,
      description,
      effort,
      priority
  }});
   return 'user story updated';
};

UserStory.prototype.delete = function(_id){
  PermissionsHelper.checkIfLogged();
  USright(projectName);

  Collections.UserStories.remove({_id});
  return 'user story deleted';
};

export default new UserStory();
