import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
export class Login extends Component {
    handleSubmit(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
    }
    render() {
        return (
           
            <div className="login-box">
                <div className="login-logo">
                </div>
                {/* /.login-logo */}
                <div className="login-box-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                    <div className="form-group has-feedback">
                      <input type="email" className="form-control" placeholder="Email" name="email"/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <input type="password" className="form-control" placeholder="Password" name="password"/>
                      <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                    <div className="row">
                      {/* /.col */}
                      <div className="col-xs-4">
                        <button onSubmit={this.handleSubmit.bind(this)} className="btn btn-primary btn-block btn-flat">Sign In</button>
                      </div>
                      {/* /.col */}
                    </div>
                  <a href="/r/register" className="text-center">Register a new membership</a>
                </div>
                {/* /.login-box-body */}
            </div>


      
   );
    }
}
