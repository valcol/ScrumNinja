module.exports = function() {
  this.When(/^I click on the project number "([^"]*)"$/, function (arg) {
    browser.waitForExist('.projects-list');
    browser.click('.projects-list .project:nth-child('+arg+')');
  });
};
