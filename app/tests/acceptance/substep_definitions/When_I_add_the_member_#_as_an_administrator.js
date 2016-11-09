module.exports = function() {
  this.When(/^I add the member "([^"]*)" as an administrator$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-footer > div > div > div > input');
    browser.setValue('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-footer > div > div > div > input', arg);
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-footer > div > div > div > div > button');
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-footer > div > div > div > div > ul > li:nth-child(1) > a', 2000);
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-footer > div > div > div > div > ul > li:nth-child(1) > a');
});
};
