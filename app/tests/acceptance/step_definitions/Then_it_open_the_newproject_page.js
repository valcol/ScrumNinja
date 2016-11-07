module.exports = function() {
  this.Then(/^it open the newproject page$/, function () {
    browser.waitForExist('.content-wrapper h1');
  });
};