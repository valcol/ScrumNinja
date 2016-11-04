module.exports = function() {
  this.Given(/^I visit my own projects page$/, function () {
    browser.url('http://localhost:3000/u/projects');
  });
};
