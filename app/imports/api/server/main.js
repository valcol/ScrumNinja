import { Meteor } from 'meteor/meteor';
import { Collections } from '../collections.js';
import { check, Match } from 'meteor/check';
import moment from 'moment';

function CreateProject(project) {
  check(project, {
    name: String,
    start: String,
    end: String,
    visibility: Match.OneOf('public', 'private'),
    description: String
  });

  if(!moment(project.start).isValid() || !moment(project.end).isValid())
    throw new Meteor.Error('date format unsupported');

  if(moment(project.start).isAfter(project.end))
      throw new Meteor.Error('start date must be before end date');

  let regex = /^[a-zA-Z ]{2,30}$/;
  if(!regex.test(project.name))
    throw new Meteor.Error('project name must only contains between 2 and 30 letters, without space');

  if(Collections.Projects.findOne({name: project.name}))
    throw new Meteor.Error('name already taken');

  // Make sure the user is logged in before inserting a project
  /*if (! this.userId) {
    throw new Meteor.Error('not-authorized');
  }*/

  Collections.Projects.insert({
    name: project.name,
    start: moment(project.start).toDate(),
    end: moment(project.end).toDate(),
    visibility: project.visibility,
    description: project.description
  });

   return 'Project created!';
}

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'project.create': CreateProject
});
