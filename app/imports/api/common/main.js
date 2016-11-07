import { Meteor } from 'meteor/meteor';
import Specifications from './specifications';

Meteor.methods({
  'specifications.delete': Specifications.delete
});
