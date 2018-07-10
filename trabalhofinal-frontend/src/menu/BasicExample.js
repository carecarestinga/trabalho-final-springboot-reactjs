import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  FuncionarioPagina from '../funcionarios/FuncionarioPagina';
import  CargoPagina from '../cargos/CargoPagina';
import  DepartamentoPagina from '../departamentos/DepartamentoPagina';
import  UsuarioPagina from '../usuarios/UsuarioPagina';
import './MenuPagina.css';
import logo from './trabalhofinal_img01.png';

const BasicExample = () => (
  <Router>
    <nav id="menu" >
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/funcionarios">Funcionarios</Link>
        </li>
        <li>
          <Link to="/cargos">Cargos</Link>
        </li>
        <li>
          <Link to="/departamentos">Departamentos</Link>
        </li>
       <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/funcionarios" component={FuncionarioPagina} />
      <Route path="/cargos" component={CargoPagina} />
      <Route path="/departamentos" component={DepartamentoPagina} />
      <Route path="/usuarios" component={UsuarioPagina} />
    </nav>
  </Router>
);

const Home = () => (
  <div id="home">
    <img src={logo}  />
  </div>
);

const Funcionarios = () => (
  <div>
    <h2>Funcionarios</h2>
  </div>
);

const Cargos = () => (
  <div>
    <h2>Cargos</h2>
  </div>
);

const Departamentos = ({ match }) => (
  <div>
    <h2>Departamentos</h2>
  </div>
);

const Usuarios = ({ match }) => (
  <div>
    <h2>Usuarios</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default BasicExample;
