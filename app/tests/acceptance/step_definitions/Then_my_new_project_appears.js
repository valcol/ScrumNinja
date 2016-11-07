module.exports = function() {
  this.Then(/^my new project appears"$/, function () {
  	expect(browser.getText(".table.table-striped:last-child > td")).toEqual("monPremierProjet");
    //expect(browser.isExisting(".table.table-striped:last-child")).toBe(true);
  });
};