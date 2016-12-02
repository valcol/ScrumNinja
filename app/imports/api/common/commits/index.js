import { Collections } from '../../common/collections.js';

let Commit = function() {};

//Format attendu : {value:'d44vzvz6dx2v',date:'23/10/2014'}, projectname, userstory identifiant

Commit.prototype.add = function(commit, projectName, usid){
    let us = Collections.UserStories.find({project: projectName, id: usid}).fetch();
    let commitTotal = {
      project: projectName,
      commit: commit.value,
      userstory: us.description,
      date: commit.date
    };

    Collections.Commits.insert(commitTotal);
     return 'commit created';
  };

export default new Commit();
