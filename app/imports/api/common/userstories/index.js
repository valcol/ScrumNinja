import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import { check, Match } from 'meteor/check';
import PermissionsHelper from '../../common/permissionsHelper.js';

let UserStory = function() {};

//TODO : demander si c'est le comportement a avoir. ca va s'afficher dans le log ou sur la page ?
//TODO : est-ce un problème d'utiliser cette synthaxe JS ?
function USright(){
  let right = PermissionsHelper.verify(Meteor.userId(), projectName, 'pa') || PermissionsHelper.verify(Meteor.userId(), projectName, 'pm');
  if (!right) 
    throw new Meteor.Error('permission error : You can\'t do that. Please, ask this project administrator about it.');
}

UserStory.prototype.add = function(id,description, effort,priority, projectName) {
  let userstory = Collections.UserStories.find({project : projectName});
  PermissionsHelper.checkIfLogged(); //throw if not.
  USright();

  Collections.UserStories.insert({
    id,
    description,
    effort,
    priority
  });

   return 'user story created';
};

UserStory.prototype.delete = function(_id, projectName){
  PermissionsHelper.checkIfLogged();
  USright();

  Collections.UserStories.remove({
    _id
  });

   return 'user story deleted';
};

export default new UserStory();
