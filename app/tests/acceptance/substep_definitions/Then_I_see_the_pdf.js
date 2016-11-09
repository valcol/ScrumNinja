module.exports = function() {
  this.Then(/^I see the PDF$/, function() {
    let errorValue = -1;

    browser.switchTab();

    expect(browser.getUrl().indexOf(
        'specifications'))
      .toBeGreaterThan(errorValue);
  });
};
