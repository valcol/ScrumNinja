module.exports = function() {
  this.When(/^I create a non functional requirement named "([^"]*)"$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div > div > form > div.col-md-8 > input', 2000);
    browser.setValue('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div > div > form > div.col-md-8 > input', arg);

    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div > div > form > div:nth-child(2) > input', 2000);
    browser.setValue('#react-root > div > div.content-wrapper > section.content > div > div > div.box-footer > div > div > form > div:nth-child(2) > input', '2');

    browser.waitForExist('button.dropdown-toggle', 2000);
    browser.click('button.dropdown-toggle');
    browser.waitForExist('.dropdown-menu-right > li:nth-child(1) > a:nth-child(1)', 2000);
    browser.click('.dropdown-menu-right > li:nth-child(2) > a:nth-child(1)');

});
};
