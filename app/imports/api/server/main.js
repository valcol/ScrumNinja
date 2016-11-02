import { Meteor } from 'meteor/meteor';
import Projects from './projects';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'project.create': Projects.create,
  'project.delete': Projects.delete
});
