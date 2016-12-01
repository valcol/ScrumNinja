import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';

let Commit = function() {};

Commit.prototype.add = function(commit, projectName){
    Collections.Commits.insert(commit);
     return 'commit created';
  };

export default new Commit();
