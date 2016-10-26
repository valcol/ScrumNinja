module.exports = function() {
  this.Given(/^I have visited the application$/, function () {
    browser.url('http://localhost:3000/u/');
  });
};
