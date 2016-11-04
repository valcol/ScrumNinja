module.exports = function() {
  this.Given(/^I visit the homepage$/, function () {
    browser.url('http://localhost:3000/r/login');
  });
};
