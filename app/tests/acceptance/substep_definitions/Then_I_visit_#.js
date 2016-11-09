module.exports = function() {
  this.Then(/^I visit "([^"]*)"$/, function (arg) {
    browser.url(arg);
    client.pause(1000);
  });
};
