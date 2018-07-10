import React from 'react';
import API from '../API';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


export default class LoginPagina extends React.Component {
    constructor() {
        super();
        this.state = {
            usuario: "",
            senha: ""

        }
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);

    }

    confirmar() {
        let dados = {
            username: this.state.usuario,
            password: this.state.senha
        };
        API.get("usuarios/login/?usuario="
            + encodeURIComponent(dados.username)
            + "&senha="
            + encodeURIComponent(dados.password)

        ).then(
            (retorno) => {

                this.login(retorno.headers['token'], retorno.data);
            }
        ).catch((erro) => this.tratarErro(erro));

    }

    login(token, usuario) {
        API.defaults.headers.common['Authorization'] = "Bearer " + token;
        this.props.onLogin(usuario);
    }

    limpar() {
        this.setState({
            usuario: "",
            senha: ""
        });
    }

    setValor(campo, valor) {
        this.setState(
            (anterior) => {
                anterior[campo] = valor;
                return anterior;
            }
        );

    }

    render() {
        return <Grid container justify="center" alignItems="center" style={
            {
                height: "100vh",

            }}>
            <Grid item xs="8" md="5" lg="3"  xl="3" >
                <Paper style={{ padding: "20px" }}>
                    <AppBar position="static">
                        <Toolbar>Login</Toolbar>
                    </AppBar>
                    <br/>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        label="Nome"
                        value={this.state.usuario}
                        onChange={(evento) => this.setValor('usuario', evento.target.value)}
                    />
                    <br /><br />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Senha"
                        type="password"
                        value={this.state.senha}
                        onChange={(evento) => this.setValor('senha', evento.target.value)}
                    />
                    <br /><br /><br/>
                    <Button fullWidth variant="raised" onClick={(evento) => { this.confirmar() }} color="primary">
                        Confirmar
          </Button>
          <br/>
                </Paper>
            </Grid>
        </Grid>
    }
}
