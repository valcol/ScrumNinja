module.exports = function() {
  this.Given(/^I visit my own projects page$/, function () {
    if(!(browser.isExisting('.breadcrumbs'))){ 
	    browser.url('http://localhost:3000/r/login');
	    browser.setValue('input[name="email"]', "test");
    	browser.setValue('input[name="password"]', "test");
    	browser.click('.login-box .btn');
    	browser.waitForExist('.breadcrumbs');
	}
  });
};
