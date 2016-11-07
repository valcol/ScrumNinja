module.exports = function() {
  // problème : il ne reconnait pas le bouton
  this.When(/^I click to sign out$/, function () {
  	browser.url('http://localhost:3000/r/login');
  	//browser.waitForExist('.dropdown');
  	var currentTime = new Date().getTime();
   	while (currentTime + 5000 >= new Date().getTime()) {
   	}

  	browser.click('li.dropdown:nth-child(2) > a:nth-child(1)');
  	browser.waitForExist('.dropdown-menu .pull-right > .btn');
    browser.click('.dropdown-menu .pull-right > .btn');
    browser.waitForExist('.login-box');
  });
};
