module.exports = function() {
  this.Then(/^my project disappears"$/, function () {
  	expect(browser.getText(".table.table-striped:last-child > td")).toEqual("");
  });
};