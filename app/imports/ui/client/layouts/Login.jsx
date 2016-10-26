import React, { Component } from 'react';

export class Login extends Component {
    render() {
        return (
    <div>
        <h2>Connexion au site</h2>            
        <label htmlFor="login"><strong>Nom de compte</strong></label>
        <input type="text" name="login" id="login" />
        <label htmlFor="pass"><strong>Mot de passe</strong></label>
        <input type="password" name="pass" id="pass" />
        <input type="submit" name="connexion" defaultValue="Se connecter" />
        <a href="/r/register"><button></button></a>

      </div>
   );
    }
}
