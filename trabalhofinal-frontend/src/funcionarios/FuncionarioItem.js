import React from "react";
import API from '../API';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'muicss/lib/react/button';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import TableRow from '@material-ui/core/TableRow';
import CargoSelect from '../cargos/CargoSelect';
import DepartamentoSelect from '../departamentos/DepartamentoSelect';
import UsuarioSelect from '../usuarios/UsuarioSelect';



export default class FuncionarioItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            nome: "",
            salario: "",
            email: "",
            cargo: '',
            cargos: null,
            departamento: '',
            departamentos: null,
            usuario: '',
            usuarios: null,
            pagina: 0,
            tamanho: 5

        }

    }

    componentDidMount() {
        this.listarCargos(0, this.state.tamanho);
        this.listarDepartamentos(0, this.state.tamanho);
        this.listarUsuarios(0, this.state.tamanho);
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

    listarDepartamentos(pagina) {
        API.get("departamentos/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ departamentos: retorno.data });
                }
            ).catch((erro) => this.tratarErro(erro));
    }

    listarUsuarios(pagina) {
        API.get("usuarios/?pagina="
            + pagina + "&tamanho=" + this.state.tamanho).then(
                (retorno) => {
                    this.setState({ usuarios: retorno.data });
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editar) {
            return {
                nome: nextProps.editar.nome,
                salario: nextProps.editar.salario,
                email: nextProps.editar.email,
                cargo: nextProps.editar.cargo,
                departamento: nextProps.editar.departamento,
                usuario: nextProps.editar.usuario

            }
        }
        return null;
    }

    setValor(campo, valor) {
        this.setState(
            (anterior) => {
                anterior[campo] = valor;
                return anterior;
            }
        );

    }

    confirmar() {
        if (this.state.nome && this.state.salario 
            && this.state.email  ) {
            let func = {
                id: this.props.editar ?
                    this.props.editar.id : null,
                nome: this.state.nome,
                salario: this.state.salario,
                email: this.state.email,
                cargo: this.state.cargo,
                departamento: this.state.departamento,
                usuario: this.state.usuario

           
            };
            this.props.onConfirmar(func);
        } else {
            alert("Preencha todos os campos!");
        }

    }

    onClick(ev) {
        let options = this.state.options,
            n = options.length + 1;
        
            options.push({value: 'option' + n, label: 'Option ' + n});
            this.setState({options: options});
    }


    render() {

  

        return <form onSubmit={(evento) => {
            // Previne que o formulário faça o submit
            // trata o envio pelo método enviar
            evento.preventDefault(); this.enviar() }} >

        <Dialog open={true} >

            <DialogTitle>{this.props.editar ? "Editar Funcionario " + this.props.editar.id : "Novo Funcionario"}</DialogTitle>
            <DialogContent>

            <TextField
                autoFocus
                margin="dense"
                label="Nome"
                fullWidth
                value={this.state.nome}
                onChange={(evento) => this.setValor('nome', evento.target.value)}
            />
            <TextField
            margin="dense"
            label="Salario"
            fullWidth
            type="number"
            value={this.state.salario}
            onChange={(evento) => this.setValor('salario', evento.target.value)}/>

            <TextField
            autoFocus
            margin="dense"
            label="Email"
            fullWidth
            value={this.state.email}
            onChange={(evento) => this.setValor('email', evento.target.value)}/>
               <br/><br/>

           <CargoSelect
            value={this.props.cargo}
            onConfirmar={(item) => this.confirmar(item)}
            onChange={(evento) => this.setValor('cargo', evento.target.value)}
            pagina={this.state.cargos} />
           <br/>

           <DepartamentoSelect
            value={this.props.departamento}
            onConfirmar={(item) => this.confirmar(item)}
            onChange={(evento) => this.setValor('departamento', evento.target.value)}
            pagina={this.state.departamentos} />
           <br/>

           <UsuarioSelect
            value={this.props.usuario}
            onConfirmar={(item) => this.confirmar(item)}
            onChange={(evento) => this.setValor('usuario', evento.target.value)}
            pagina={this.state.usuarios} />
           <br/>




            <br/><br/>
            </DialogContent>
            <DialogActions>
                <Button onClick={(evento) => { this.props.onCancelar() }} color="primary">
                    Cancelar
              </Button>
                <Button onClick={(evento) => { this.confirmar() }} color="primary">
                    Confirmar
              </Button>
            </DialogActions>
        </Dialog>

        </ form>

    }
} 