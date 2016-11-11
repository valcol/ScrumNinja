import { Meteor } from 'meteor/meteor';
import Specifications from './specifications';
import Requirement from './requirements';
import UserStory from './userstories';

Meteor.methods({
  'specifications.delete': Specifications.delete,
  'requirement.add' : Requirement.add,
  'requirement.delete' : Requirement.delete,
  'userstory.add' : UserStory.upsert,
  'userstory.update' : UserStory.upsert,
  'userstory.delete' : UserStory.delete
});
