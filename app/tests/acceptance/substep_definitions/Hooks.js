var myHooks = function () {

  this.Before(function (scenario) {
    console.log("before global");
    //Reset DB
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
    browser.url('http://localhost:3000/');
    client.pause(1000);
  });

  this.Before({tags: ["@user1Exist"]}, function (scenario) {
    console.log("before @user1Exist");
    browser.url('http://localhost:3000/r/register');
    browser.waitForExist('.register-box', 1000);
    browser.timeoutsAsyncScript(1000).executeAsync(function(done) {
      Accounts.createUser({
        email: 'user1',
        password: 'user1',
        username: 'user1'
      }, function(err) {
        if (err) {
          console.error('Could not login', err);
        } else {
          done();
        }
      })
    });
    browser.timeoutsAsyncScript(1000).executeAsync(function(done) {
      Meteor.logout(function(err) {
        if (err) {
          console.error('Could not logout', err);
        } else {
          done();
        }
      });
    });
    browser.url('http://localhost:3000');
    browser.waitForExist('.login-box', 1000);
  });

  this.Before({tags: ["@user2Exist"]}, function (scenario) {
    console.log("before @user2Exist");
    browser.url('http://localhost:3000/r/register');
    browser.waitForExist('.register-box', 1000);
    browser.timeoutsAsyncScript(1000).executeAsync(function(done) {
      Accounts.createUser({
        email: 'user2',
        password: 'user2',
        username: 'user2'
      }, function(err) {
        if (err) {
          console.error('Could not login', err);
        } else {
          done();
        }
      })
    });
    browser.timeoutsAsyncScript(1000).executeAsync(function(done) {
      Meteor.logout(function(err) {
        if (err) {
          console.error('Could not logout', err);
        } else {
          done();
        }
      });
    });
    browser.url('http://localhost:3000');
    browser.waitForExist('.login-box', 1000);
  });

  this.Before({tags: ["@user1Logged"]}, function (scenario) {
    console.log("before @user1Logged");
    browser.url('http://localhost:3000/r/login');
    browser.executeAsync(function(done) {
      Meteor.loginWithPassword('user1', 'user1', function(err) {
        if (err) {
          console.error('Could not login', err);
        } else {
          done();
        }
      })
    });
    browser.url('http://localhost:3000');
  });

  this.Before({tags: ["@projectExist"]}, function (scenario) {
    console.log("before @projectExist");
    browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
      Meteor.call('project.create',
      {
        name: 'project',
        start: '2016-02-02',
        end: '2016-03-02',
        visibility: 'public',
        description: 'project'
      }
      , function(err, res) {
        if (err) {
          console.error('couldnt create project');
        } else {
          done();
        }
      });
    });
    // This hook will be executed before scenarios tagged with @foo
  });
/*
  this.Before({tags: ["@user2AsMember"]}, function (scenario) {
    console.log("before @user2AsMember");
    browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
      Meteor.call('permission.addViaEmail','user2','project','pa'
                  ,function(err, res) {
                      if (err) {
                        console.error('couldnt associate user2 as member');
                      } else {
                        done();
                      }
     });
    });
  });
*/

this.Before({tags: ["@requirementExist"]}, function (scenario) {
  console.log("before @requirementExist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
    let state = {
        id: 0,
        description:'requirement1',
        priority :'2'
    };
    Meteor.call('requirement.add',state, 'f', 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create requirement1');
                  } else {
                    done();
                  }
                });
  });
});

this.Before({tags: ["@userstoryExist"]}, function (scenario) {
  console.log("before @userstoryExist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
     let state = {
      id: 0,
      description: 'us1',
      effort: 1,
      priority: 2,
      color: '#ff851b' //orange
    };

    Meteor.call('userstory.add',state, 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create us1');
                  } else {
                    done();
                  }
                });
  });
});

this.Before({tags: ["@userstory2Exist"]}, function (scenario) {
  console.log("before @userstory2Exist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
     let state = {
      id: 1,
      description: 'us2',
      effort: 10,
      priority: 1,
      color: '#39cccc' //blue light
    };

    Meteor.call('userstory.add',state, 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create us2');
                  } else {
                    done();
                  }
                });
  });
});

this.Before({tags: ["@task1Exist"]}, function (scenario) {
  console.log("before @task1Exist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
    this.state = {
      id: 1,
      description: 'task1',
      userstory: [1]
    };

    Meteor.call('tasks.update',state, 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create task');
                  } else {
                    done();
                  }
                });
  });
});

this.Before({tags: ["@task2Exist"]}, function (scenario) {
  console.log("before @task2Exist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
    this.state = {
      id: 2,
      description: 'task2',
      userstory: [1]
    };

    Meteor.call('tasks.update',state, 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create task');
                  } else {
                    done();
                  }
                });
  });
});

this.Before({tags: ["@dependency1Exist"]}, function (scenario) {
  console.log("before @dependency1Exist");
  browser.timeoutsAsyncScript(2000).executeAsync(function(done) {
    this.state = {
      edge: [1, 2]
    };

    Meteor.call('dependencies.update',state, 'project'
                ,function(err, res) {
                  if (err) {
                    console.error('couldnt create dependency');
                  } else {
                    done();
                  }
                });
  });
});

this.After(function (scenario) {
  console.log("after");
});
};

module.exports = myHooks;
