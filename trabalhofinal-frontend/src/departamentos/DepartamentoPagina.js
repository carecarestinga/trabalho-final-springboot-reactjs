import React from 'react';
import DepartamentoLista from './DepartamentoLista';
import DepartamentoItem from './DepartamentoItem';
import API from '../API';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class DepartamentoPagina extends React.Component {
    constructor() {
        super();
        this.state = {
            departamentos: null,
            pagina: 0,
            tamanho: 5
        }
    }
    componentDidMount() {
        this.listar(0, this.state.tamanho);
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

    listar(pagina) {
        API.get("departamentos/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ departamentos: retorno.data });
                }
            ).catch((erro) => this.tratarErro(erro));
    }

    inserir(departamento) {
        API.post("departamentos/", departamento).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }

    atualizar(departamento) {
        API.put("departamentos/" + departamento.id, departamento).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    confirmarExcluir(departamento) {
        this.setState({
            confirmarExcluir: departamento
        });
    }


    excluir(departamento) {
        API.delete("departamentos/" + departamento.id).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    editar(departamento) {
        this.setState({
            exibirFormulario: true,
            editar: departamento
        });
    }
    confirmar(departamento) {
        if (departamento.id) {
            this.atualizar(departamento);
        } else {
            this.inserir(departamento);
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
        console.log(this.state.departamentos);
        return <div>
            <DepartamentoLista
                onEditar={(departamento) => this.editar(departamento)}
                onExcluir={(departamento) => this.confirmarExcluir(departamento)}
                onMudaPagina={(pagina) => this.listar(pagina)}
                onMudaTamanho={(tamanho) => this.mudaTamanho(tamanho)}
                pagina={this.state.departamentos} 
          />
            {this.state.exibirFormulario ? <DepartamentoItem
                onConfirmar={(departamento) => this.confirmar(departamento)}
                onCancelar={() => this.limpar()}
                editar={this.state.editar} /> : ""}
            <div style={{ textAlign: "right", paddingRight: "15px" }}>
                <Button variant="fab" onClick={() => this.novo()} color="primary">
                    <Icon> add</Icon>
                </Button>

                {this.state.confirmarExcluir ? <Dialog open={true}>
                    <DialogTitle>{"Excluir Departamento " + this.state.confirmarExcluir.id}</DialogTitle>
                    <DialogContent>
                        Deseja excluir o Departamento:  {this.state.confirmarExcluir.nome}
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
