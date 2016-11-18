module.exports = function() {
   this.When(/^I click on the tasksdependencies menu button$/, function () {
    browser.waitForExist('#react-root > div > aside.main-sidebar > section > ul > li.treeview > a', 2000);
    browser.click('#react-root > div > aside.main-sidebar > section > ul > li.treeview > a');
    browser.waitForExist('#react-root > div > aside.main-sidebar > section > ul > li.treeview.active > ul > li:nth-child(2) > a', 2000);
    browser.click('#react-root > div > aside.main-sidebar > section > ul > li.treeview.active > ul > li:nth-child(2) > a');
  });
};
