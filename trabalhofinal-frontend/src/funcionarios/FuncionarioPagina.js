import React from 'react';
import FuncionarioLista from './FuncionarioLista';
import FuncionarioItem from './FuncionarioItem';
import API from '../API';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class FuncionarioPagina extends React.Component {
     constructor() {
        super();
        this.state = {
            cargos: [],
            funcionarios: null,
            pagina: 0,
            tamanho: 10
        }
    }
    componentDidMount() {
        this.listar(0, this.state.tamanho);
        this.listarCargos(0, this.state.tamanho);
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);

    }
    mudaTamanho(tamanho) {
        this.setState({ tamanho: tamanho },
            () => this.listar(0)
        )
    }

    listarCargos(pagina) {
        API.get("cargos/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ cargos: retorno.data });
                }
            ).catch((erro) => this.tratarErro(erro));
    }

    listar(pagina) {
        API.get("funcionarios/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ funcionarios: retorno.data });
                }
            ).catch((erro) => this.tratarErro(erro));
    }

    inserir(item) {
        API.post("funcionarios/", item).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }

    atualizar(item) {
        API.put("funcionarios/" + item.id, item).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    confirmarExcluir(item) {
        this.setState({
            confirmarExcluir: item
        });
    }


    excluir(item) {
        API.delete("funcionarios/" + item.id).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    editar(item) {
        this.setState({
            exibirFormulario: true,
            editar: item
        });
    }
    confirmar(item) {
        if (item.id) {
            this.atualizar(item);
        } else {
            this.inserir(item);
        }
    }

    limpar() {
        this.setState({
            exibirFormulario: false,
            editar: null,
            confirmarExcluir: null
        });
    }

    novo() {
        this.setState({
            exibirFormulario: true,
            editar: null
        });
    }

    
    render() {
        console.log(this.state.funcionarios);
        return <div>
            <FuncionarioLista
                onEditar={(item) => this.editar(item)}
                onExcluir={(item) => this.confirmarExcluir(item)}
                onMudaPagina={(pagina) => this.listar(pagina)}
                onMudaTamanho={(tamanho) => this.mudaTamanho(tamanho)}
                pagina={this.state.funcionarios} 
            />
            {this.state.exibirFormulario ? <FuncionarioItem
                onConfirmar={(item) => this.confirmar(item)}
                onCancelar={() => this.limpar()}
                editar={this.state.editar} 
                listarCargos={this.state.cargos}  /> : ""}
            <div style={{ textAlign: "right", paddingRight: "15px" }}>
                <Button variant="fab" onClick={() => this.novo()} color="primary">
                    <Icon> add</Icon>
                </Button>

                {this.state.confirmarExcluir ? <Dialog open={true}>
                    <DialogTitle>{"Excluir Funcionario " + this.state.confirmarExcluir.id}</DialogTitle>
                    <DialogContent>
                        Deseja excluir o Funcionario:  {this.state.confirmarExcluir.nome}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(evento) => { this.setState({ confirmarExcluir: null }) }} color="primary">
                            Cancelar
              </Button>
                        <Button onClick={(evento) => { this.excluir(this.state.confirmarExcluir) }} color="primary">
                            Confirmar
              </Button>
                    </DialogActions>
                </Dialog> : ""}
            </div>

        </div>;

    }

}
