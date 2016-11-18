module.exports = function() {
   this.When(/^I click on the task management menu button$/, function () {
     //open tasks submenu
    browser.waitForExist('.treeview > a:nth-child(1)', 2000);
    browser.click('.treeview > a:nth-child(1)');

    browser.waitForExist('.treeview-menu > li:nth-child(1) > a:nth-child(1)', 2000);
    browser.click('.treeview-menu > li:nth-child(1) > a:nth-child(1)');
  });
};
