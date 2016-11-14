import { Meteor } from 'meteor/meteor';
import Specifications from './specifications';
import Requirement from './requirements';
import UserStory from './userstories';
import Tasks from './tasks';

Meteor.methods({
  'specifications.delete': Specifications.delete,
  'requirement.add' : Requirement.add,
  'requirement.delete' : Requirement.delete,
  'userstory.add' : UserStory.upsert,
  'userstory.update' : UserStory.upsert,
  'userstory.delete' : UserStory.delete,
  'tasks.update' : Tasks.upsert,
  'tasks.delete' : Tasks.delete
});
