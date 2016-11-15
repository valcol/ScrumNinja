import { Collections } from '../common/collections.js';
import { Meteor } from 'meteor/meteor';
import PermissionsHelper from '../common/permissionsHelper.js';

// Publish here
Meteor.publish('projects', function() {
  return Collections.Projects.find({['roles.'+this.userId]:{$exists : true}});
});

Meteor.publish('public-projects', function() {
  return Collections.Projects.find({visibility: 'public'});
});

Meteor.publish('users', function(projectName) {
  if (PermissionsHelper.isAvailableToView(this.userId, projectName, true)){
    let project = Collections.Projects.findOne({name: projectName});
    return Meteor.users.find({ _id: { $in: Object.keys(project.roles) } });
  }
});

Meteor.publish('requirements', function(projectName) {
  return Collections.Requirements.find({project:projectName});
});

Collections.Specifications.allowClient();

Meteor.publish('files.specifications.all', function (projectName) {
  if (PermissionsHelper.isAvailableToView(this.userId, projectName, false))
  return Collections.Specifications.find({'meta.project':projectName}).cursor;
});

Meteor.publish('userstories', function(projectName) {
  if (PermissionsHelper.isAvailableToView(this.userId, projectName, true))
  return Collections.UserStories.find({project:projectName});
});

Meteor.publish('sprints', function(projectName) {
  return Collections.Sprints.find({project:projectName});
});

Meteor.publish('tasks', function(projectName) {
  if (PermissionsHelper.isAvailableToView(this.userId, projectName, true))
  return Collections.Tasks.find({project:projectName});
});
