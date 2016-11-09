module.exports = function() {
   this.When(/^I click on the view button$/, function () {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(3) > a > button', 2000);
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(3) > a > button');
  });
};
