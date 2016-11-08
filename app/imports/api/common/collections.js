import { Mongo } from 'meteor/mongo';

CollectionsObj = {};

CollectionsObj.Specifications = new Meteor.Files({
  debug: true,
  collectionName: 'Specifications',
  allowClientCode: true, // Disallow remove files from Clien
  storagePath : '/data/Meteor/uploads/',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in pdf formats
    if (file.size <= 1024*1024*10 && /pdf/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload pdf, with size equal or less than 10MB';
    }
  }
});

CollectionsObj.Projects = new Mongo.Collection('projects');

CollectionsObj.Requirements = new Mongo.Collection('requirements');

export const Collections = CollectionsObj;
