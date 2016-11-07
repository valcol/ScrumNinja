import { Meteor } from 'meteor/meteor';
import Projects from './projects';
import Specifications from './specifications';

Meteor.methods({
  'project.create': Projects.create,
  'project.delete': Projects.delete,
  'specifications.delete': Specifications.delete
});
