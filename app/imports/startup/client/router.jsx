import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router';

import { App } from '../../ui/client/pages/App.jsx';
import { LoginRegister } from '../../ui/client/pages/LoginRegister.jsx';

import { Projects } from '../../ui/client/layouts/Projects.jsx';
import { NewProject } from '../../ui/client/layouts/NewProject.jsx';
import { Profile } from '../../ui/client/layouts/Profile.jsx';
import { Dashboard } from '../../ui/client/layouts/Dashboard.jsx';
import { Specifications } from '../../ui/client/layouts/Specifications.jsx';
import { Requierements } from '../../ui/client/layouts/Requierements.jsx';
import { UserStories } from '../../ui/client/layouts/UserStories.jsx';
import { Tasks } from '../../ui/client/layouts/Tasks.jsx';
import { Sprint } from '../../ui/client/layouts/Sprint.jsx';
import { ScrumBoard } from '../../ui/client/layouts/ScrumBoard.jsx';
import { Traceability } from '../../ui/client/layouts/Traceability.jsx';
import { NotFound } from '../../ui/client/pages/404.jsx';
import { Login } from '../../ui/client/layouts/Login.jsx';
import { Register } from '../../ui/client/layouts/Register.jsx';

Meteor.startup( () => {

  let authGlobal = function(nextState, replace) {
    //Check here if user is allowed to access to the page
    let projectName = nextState.params.projectName;
    let logReg = nextState.params.logReg;
    if (true) {
      replace({
        pathname: '/r/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  };

  let authProject = function(nextState, replace) {
    //Check here if user is allowed to access to the page
    let projectName = nextState.params.projectName;
    if (false) {
      replace({
        pathname: '/404',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  };

  render(
  <Router history={ browserHistory }>
      <Route path="/" component={App} onEnter={authGlobal}>
        <IndexRedirect to="/u" />
      </Route>
      <Route path="/u" name={"Home"} component={App}>
        <IndexRedirect to="projects" />
        <Route path="projects"  component={Projects}/>
        <Route path="newproject" component={NewProject}/>
        <Route path="profile" component={Profile} />
      </Route>
      <Route path="/p" name={"Project Home"} component={App} onEnter={authProject}>
        <IndexRedirect to="/u" />
        <Route path=":projectName/dashboard" component={Dashboard}/>
        <Route path=":projectName/specifications" component={Specifications}/>
        <Route path=":projectName/requierements" component={Requierements}/>
        <Route path=":projectName/userstories" component={UserStories}/>
        <Route path=":projectName/tasks" component={Tasks}/>
        <Route path=":projectName/sprint" component={Sprint}/>
        <Route path=":projectName/scrumboard" component={ScrumBoard}/>
        <Route path=":projectName/traceability" component={Traceability}/>
        <Redirect to=":projectName/dashboard" from=":projectName"/>
      </Route>
        <Route path="/r" component={LoginRegister} >
        <IndexRedirect to="login" />
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
     </Route>
        <Route path="/404" component={ NotFound } />
      <Redirect to="/404" from="*"/>
    </Router>,
    document.getElementById('react-root')
  );
});
