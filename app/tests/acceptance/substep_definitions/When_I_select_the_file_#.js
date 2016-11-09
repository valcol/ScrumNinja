module.exports = function() {
  this.When(/^I select the file "([^"]*)"$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div.box-footer > div.row > div > div.input-group > span > label > input');
    browser.execute("document.querySelector('#react-root > div > div.content-wrapper > section.content > div > div.box-footer > div.row > div > div.input-group > span > label > input').style.display='block';");
    browser.setValue('#react-root > div > div.content-wrapper > section.content > div > div.box-footer > div.row > div > div.input-group > span > label > input', arg);
});
};