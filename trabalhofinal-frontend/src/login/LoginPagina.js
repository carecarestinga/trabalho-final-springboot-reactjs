import React from 'react';
import API from '../API';

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
                this.login(dados, retorno.data);
            }
        ).catch((erro) => this.tratarErro(erro));

    }

    login(dados, usuario) {
        API.defaults.auth = dados;
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
        return <div>
            <br />
            <br />
            <label>Nome: </label>
            <input
                value={this.state.usuario}
                onChange={(evento) => this.setValor('usuario', evento.target.value)} /><br /><br />
            <label>Senha: </label>
            <input
                type="password"
                value={this.state.senha}
                onChange={(evento) => this.setValor('senha', evento.target.value)}
            /><br /><br />
            <button onClick={(evento) => { this.confirmar() }}>Confirmar</button>
            <button onClick={(evento) => { this.limpar() }}>Cancelar</button>
        </div>;

    }
}
