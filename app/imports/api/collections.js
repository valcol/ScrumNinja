import { Mongo } from 'meteor/mongo';

CollectionsObj = {};

// Add helper Collections for Client
Meteor.isClient && Template.registerHelper('Collections', CollectionsObj);

// Add collections here
CollectionsObj.Projects = new Mongo.Collection('projects');

CollectionsObj.CDC = new Meteor.Files({
  debug: true,
  collectionName: 'CDC',
  allowClientCode: true, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in pdf formats
    if (file.size <= 1024*1024*10 && /pdf/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload pdf, with size equal or less than 10MB';
    }
  }
});

export const Collections = CollectionsObj;
