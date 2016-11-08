import { Meteor } from 'meteor/meteor';
import Specifications from './specifications';
import Requirement from './requirements';

Meteor.methods({
  'specifications.delete': Specifications.delete,
  'requirement.add' : Requirement.add,
  'requirement.delete' : Requirement.delete
});
