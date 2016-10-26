import React, { Component } from 'react';

export class Register extends Component {
     render() {
        return (   
    <div>
        <h2>Register to the WebSite</h2>            
        <label htmlFor="mail"><strong>Email</strong></label>
        <input type="text" name="email" id="email" />
        <label htmlFor="pass"><strong>Mot de passe</strong></label>
        <input type="password" name="pass" id="pass" />
        <label htmlFor="nom"><strong>Nom</strong></label>
        <input type="text" name="nom" id="nom" />
        <label htmlFor="prenom"><strong>Prenom</strong></label>
        <input type="text" name="prenom" id="prenom" />
            
      </div>);
    }
}