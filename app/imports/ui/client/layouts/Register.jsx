import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export class Register extends Component {
    handleSubmit(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var repassword = $('[name=repassword]').val();
        var fulname = $('[name=fullname]').val();
        if(password==repassword){
            Accounts.createUser({
                email: email,
                password: password,
                username: fullname
            });
        }
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
              <input type="text" className="form-control" placeholder="Full name" name ="fullname"/>
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email"  name ="email"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" name ="password"/>
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" name ="repassword"/>
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className="row">
              
              {/* /.col */}
              <div className="col-xs-4">
                <button className="btn btn-primary btn-block btn-flat" onSubmit={this.handleSubmit.bind(this)}>Register</button>
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