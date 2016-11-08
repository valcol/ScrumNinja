import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router';

import App from '../../ui/client/pages/App';
import Authentication from '../../ui/client/pages/Authentication';

import Projects from '../../ui/client/layouts/Projects';
import CreateProject from '../../ui/client/layouts/CreateProject';
import Profile from '../../ui/client/layouts/Profile';
import Dashboard from '../../ui/client/layouts/Dashboard';
import Specifications from '../../ui/client/layouts/Specifications';
import Requirements from '../../ui/client/layouts/Requirements';
import UserStories from '../../ui/client/layouts/UserStories';
import Tasks from '../../ui/client/layouts/Tasks';
import Sprints from '../../ui/client/layouts/Sprints';
import ScrumBoard from '../../ui/client/layouts/ScrumBoard';
import Traceability from '../../ui/client/layouts/Traceability';
import NotFound from '../../ui/client/pages/404/';
import Login from '../../ui/client/layouts/Login';
import Register from '../../ui/client/layouts/Register';

Meteor.startup( () => {

  let authGlobal = function(nextState, replace) {
    //Check here if user is allowed to access to the page
    let projectName = nextState.params.projectName;
    if (!Meteor.userId()) {
      replace({
        pathname: '/r/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  render(
  <Router history={ browserHistory }>
      <Route path="/" component={App}>
        <IndexRedirect to="/u" />
      </Route>
      <Route path="/u" name={'Home'} component={App} onEnter={authGlobal}>
        <IndexRedirect to="projects" />
        <Route path="projects" name={'My Projects'}  component={Projects}/>
        <Route path="newproject" name={'Create a Project'} component={CreateProject}/>
        <Route path="profile" name={'Profile'} component={Profile} />
      </Route>
      <Route path="/p" name={'Project Home'} component={App} onEnter={authGlobal}>
        <IndexRedirect name={'Project Home'} to="/u" />
        <Route path=":projectName/dashboard" name={'Dashboard'} component={Dashboard}/>
        <Route path=":projectName/specifications" name={'Specifications'} component={Specifications}/>
        <Route path=":projectName/requirements" name={'Requirements'} component={Requirements}/>
        <Route path=":projectName/userstories" name={'User Stories'} component={UserStories}/>
        <Route path=":projectName/tasks" name={'Tasks'} component={Tasks}/>
        <Route path=":projectName/sprint" name={'Sprints'} component={Sprints}/>
        <Route path=":projectName/scrumboard" name={'ScrumBoard'} component={ScrumBoard}/>
        <Route path=":projectName/traceability" name={'Traceability'} component={Traceability}/>
        <Redirect to=":projectName/dashboard" from=":projectName"/>
      </Route>
        <Route path="/r" component={Authentication} >
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
