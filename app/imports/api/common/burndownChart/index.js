import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';

let BurndownChart = function() {};

BurndownChart.prototype.upsert = function(burndownChart, projectName) {

    NonEmptyArrayOfNumbers = Match.Where(function (x) {
      check(x, [Number]);
      return x.length > 0;
    });

  PermissionsHelper.checkIfLogged();
  check(burndownChart, {
    nbSprint : Number,
    planned : [Number],
    actual : [Number],
    plannedBySprint : [Number]
  });
  burndownChart.project = projectName;

  let effort =   burndownChart.planned[0] - burndownChart.plannedBySprint[0];
  for(i=1;i<burndownChart.nbSprint;i++){
    burndownChart.planned[i].push(effort);
    effort = burndownChart.plannedBySprint[i];
  }

  return 'BurndownChart updated';
};

export default new BurndownChart();
