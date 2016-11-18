module.exports = function() {
  this.Then(/^I dont see the dependency$/, function () {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > div > div.col-md-8 > table > tbody > tr:nth-child(2)', 1000, true);
  });
};
