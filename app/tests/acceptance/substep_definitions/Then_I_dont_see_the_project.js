module.exports = function() {
  this.Then(/^I dont see the project$/, function () {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2)', 1000, true);
  });
};
