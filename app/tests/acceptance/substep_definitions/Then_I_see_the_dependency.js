module.exports = function() {
  this.Then(/^I see the dependency$/, function () {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > div > div.col-md-8 > table > tbody > tr:nth-child(2)', 2000);
    client.pause(1000);
  });
};
