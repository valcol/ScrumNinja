import { Mongo } from 'meteor/mongo';

CollectionsObj = {};

// Add helper Collections for Client
Meteor.isClient && Template.registerHelper('Collections', CollectionsObj);

// Add collections here
CollectionsObj.Projects = new Mongo.Collection('projects');

export const Collections = CollectionsObj;
