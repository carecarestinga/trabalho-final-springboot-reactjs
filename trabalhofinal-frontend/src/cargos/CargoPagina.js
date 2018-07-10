import React from 'react';
import CargoLista from './CargoLista';
import CargoItem from './CargoItem';
import API from '../API';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class CargoPagina extends React.Component {
    constructor() {
        super();
        this.state = {
            cargos: null,
            listarCargos:[],
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
        API.get("cargos/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ cargos: retorno.data,
                                    listarCargos: retorno.data
                                     });
                }
            ).catch((erro) => this.tratarErro(erro));
    }

    inserir(item) {
        API.post("cargos/", item).then(
            () => {
                this.listar(0);
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }

    atualizar(item) {
        API.put("cargos/" + item.id, item).then(
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
        API.delete("cargos/" + item.id).then(
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
        console.log(this.state.cargos);
        return <div>
            <CargoLista
                onEditar={(item) => this.editar(item)}
                onExcluir={(item) => this.confirmarExcluir(item)}
                onMudaPagina={(pagina) => this.listar(pagina)}
                onMudaTamanho={(tamanho) => this.mudaTamanho(tamanho)}
                pagina={this.state.cargos} />
            {this.state.exibirFormulario ? <CargoItem
                onConfirmar={(item) => this.confirmar(item)}
                onCancelar={() => this.limpar()}
                editar={this.state.editar} /> : ""}
            <div style={{ textAlign: "right", paddingRight: "15px" }}>
                <Button variant="fab" onClick={() => this.novo()} color="primary">
                    <Icon> add</Icon>
                </Button>

                {this.state.confirmarExcluir ? <Dialog open={true}>
                    <DialogTitle>{"Excluir item " + this.state.confirmarExcluir.id}</DialogTitle>
                    <DialogContent>
                        Deseja excluir o item:  {this.state.confirmarExcluir.nome}
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
