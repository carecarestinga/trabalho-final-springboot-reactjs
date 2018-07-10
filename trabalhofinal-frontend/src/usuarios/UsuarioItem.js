import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'muicss/lib/react/select';


export default class UsuarioItem extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
             showPassword: false,
            id: null,
            nome: "",
            email: "",
            login: "",
            senha: "", 
            novaSenha: '',
            permissoes: '',
            permis: [
                    "administrador",
                    "supervisor",
                    "gerente",
                    "usuarioavancado",
                    "usuariocomum"
                    ]
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editar) {
            return {
                nome: nextProps.editar.nome,
                email: nextProps.editar.email,
                login: nextProps.editar.login,
                senha: nextProps.editar.senha,
                novaSenha: nextProps.editar.novaSenha,
                permissoes: nextProps.editar.permissoes
                
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
        if (this.state.nome && this.state.email && this.state.login 
            && this.state.senha  ) {
            let prod = {
                id: this.props.editar ? this.props.editar.id : null,
                nome: this.state.nome,
                email: this.state.email,
                login: this.state.login,
                senha: this.state.senha,
    
                permissoes: this.state.permissoes
               
            };
            this.props.onConfirmar(prod);
        } else {
            alert("Preencha todos os campos!");
        }

    }




    render() {


        return <Dialog
            open={true}
        >
            <DialogTitle>{this.props.editar ? "Editar item " + this.props.editar.id : "Novo item"}</DialogTitle>
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
                    autoFocus
                    margin="dense"
                    label="Email"
                    fullWidth
                    value={this.state.email}
                    onChange={(evento) => this.setValor('email', evento.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Login"
                    fullWidth
                    value={this.state.login}
                    onChange={(evento) => this.setValor('login', evento.target.value)}
                />
                <TextField
                    type= 'password'
                    autoFocus
                    margin="dense"
                    label="Senha"
                    fullWidth
                    value={this.state.senha}
                    onChange={(evento) => this.setValor('senha', evento.target.value)}
                />


                <Select name="permis" id="permis" 
                label="Permissão"
               
                value={this.state.permissoes}
                onChange={(evento) => this.setValor('permis', evento.target.value)}
                >
                <option value="">Selecione a Permissão</option>
                {
                    
                   this.state.permis.map((permis) =>{
                        return(<option key={permis} 
                            value={permis}>{permis}</option>)                                    })     
                }
                </Select> 


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


    }
} 