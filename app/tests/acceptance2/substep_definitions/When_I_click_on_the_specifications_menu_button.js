module.exports = function() {
   this.When(/^I click on the specifications menu button$/, function () {
    browser.waitForExist('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(7) > a > span', 2000);
    browser.click('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(7) > a > span');
  });
};
