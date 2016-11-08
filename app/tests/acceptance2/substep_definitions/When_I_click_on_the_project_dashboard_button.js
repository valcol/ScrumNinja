module.exports = function() {
  this.When(/^I click on the project dashboard button$/, function () {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(5) > div > a > button', 2000);
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(5) > div > a > button');
  });
};
