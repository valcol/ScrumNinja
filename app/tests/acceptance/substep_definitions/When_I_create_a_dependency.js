module.exports = function() {
   this.When(/^I create a dependency$/, function () {

    browser.waitForExist('div.box-footer > div.row > div > form > div:nth-child(1) > select', 2000);
    browser.click('div.box-footer > div.row > div > form > div:nth-child(1) > select');
    browser.click('div.box-footer > div.row > div > form > div:nth-child(1) > select > option:nth-child(2)');

    browser.waitForExist('div.box-footer > div.row > div > form > div:nth-child(3) > select', 2000);
    browser.click('div.box-footer > div.row > div > form > div:nth-child(3) > select');
    browser.click('div.box-footer > div.row > div > form > div:nth-child(3) > select > option:nth-child(3)');

    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div.row > div > form > div:nth-child(4) > button', 2000);
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div.row > div > form > div:nth-child(4) > button');

  });
};
