import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

export class Register extends Component {
 constructor(props) {
    super(props);
    this.state = {email: '', password: '', repassword: '', fullname: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
    this.handleChangeFullname = this.handleChangeFullname.bind(this);
  }
    
    handleChangeEmail(event) {
    this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    
    handleChangeRePassword(event) {
    this.setState({repassword: event.target.value});
    }
    
    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    }
   
    handleSubmit(event) {
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let repassword = this.state.repassword;
        let fullname = this.state.fullname;

        if(password==repassword){
            Accounts.createUser({
                email: email,
                password: password,
                username: fullname
            });
        }
        else{
            alert('The passwords are different. Please, try again !');
        }
    }
    
    componentWillMount(){
        Tracker.autorun(() => {
            if (Meteor.userId()) {
                browserHistory.push('/u/projects');
            }
        })
    }
     render() {
        return (   
    <div className="register-box">
        <div className="register-logo">
            <img src="/img/logo-wide.png" width='75%' height='75%' alt="logo"></img>
        </div>
        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Full name" name ="fullname" value ={this.state.fullname}
                        onChange={this.handleChangeFullname}/>
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email"  name ="email" value={this.state.email}
                onChange={this.handleChangeEmail}/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" name ="password" value ={this.state.password}
                onChange={this.handleChangePassword}/>
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" name ="repassword" value = {this.state.repassword}
                onChange={this.handleChangeRePassword}/>
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className="row">
              
              {/* /.col */}
              <div className="col-xs-4">
                <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
              {/* /.col */}
            </div>
          <a href="/r/login" className="text-center">I already have a membership</a>
        </div>
        {/* /.form-box */}
      </div>

      );
    }
}