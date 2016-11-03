import { Collections } from '../collections.js';
import { Meteor } from 'meteor/meteor';

// Publish here
Meteor.publish('projects', function() {
  return Collections.Projects.find({$or: [{pa: this.userId},{pm: this.userId},{po: this.userId}]});
});

Meteor.publish('public-projects', function() {
  return Collections.Projects.find({visibility: 'public'});
});
