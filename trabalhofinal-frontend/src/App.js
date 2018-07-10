import React, { Component } from 'react';
import MenuPagina from './menu/MenuPagina';
import LoginPagina from './login/LoginMaterialPagina';
import API from './API';

export default class App extends Component {
 
  constructor() {
    super();
    this.state = {
      usuario: null
    };
  }


  render() {
    
    if (this.state.usuario)
      return <MenuPagina />;
    else
      return <LoginPagina onLogin={
        (usuarioRetorno) =>
          this.setState({ usuario: usuarioRetorno })} />;
  }




}

