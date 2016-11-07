import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import { check, Match } from 'meteor/check';
import moment from 'moment';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Projects = function() {};

Projects.prototype.create = function(project) {

  PermissionsHelper.checkIfLogged();

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

  Collections.Projects.insert({
    name: project.name,
    start: moment(project.start).toDate(),
    end: moment(project.end).toDate(),
    visibility: project.visibility,
    description: project.description,
    roles: {[Meteor.userId()]:'pa'}
  });

   return 'Project created';
};

Projects.prototype.delete = function(projectName){

  PermissionsHelper.checkIfLogged();

  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  Collections.Projects.remove({
    name: projectName
  });

   return 'Project deleted';
};

export default new Projects();
