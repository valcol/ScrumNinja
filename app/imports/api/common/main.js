import { Meteor } from 'meteor/meteor';
import Specifications from './specifications';
import Requirement from './requirements';
import UserStory from './userstories';
import Sprint from './sprint';
import Tasks from './tasks';
import Commit from './commits';
import Dependencies from './dependencies';
import BurndownChart from './burndownChart';

Meteor.methods({
  'specifications.delete': Specifications.delete,
  'requirement.add' : Requirement.add,
  'requirement.delete' : Requirement.delete,
  'userstory.add' : UserStory.upsert,
  'userstory.update' : UserStory.upsert,
  'userstory.delete' : UserStory.delete,
  'sprint.add' : Sprint.add,
  'sprint.delete' : Sprint.delete,
  'tasks.update' : Tasks.upsert,
  'tasks.delete' : Tasks.delete,
  'dependencies.update' : Dependencies.upsert,
  'dependencies.delete' : Dependencies.remove,
  'burndownChart.update' : BurndownChart.upsert,
  'tasks.addUser' : Tasks.addUser,
  'userstory.traceability.upsert' : UserStory.upsertTrace,
  'userstory.traceability.delete' : UserStory.deleteTrace
});
