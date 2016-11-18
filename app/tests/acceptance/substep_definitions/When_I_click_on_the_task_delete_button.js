module.exports = function() {
   this.When(/^I click on the task delete button$/, function () {
     browser.waitForExist('.btn-danger', 2000);
     browser.click('.btn-danger');
  });
};
