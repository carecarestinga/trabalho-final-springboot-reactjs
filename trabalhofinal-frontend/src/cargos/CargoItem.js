import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class CargoItem extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            id: null,
            nome: "",
            descricao: ""
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editar) {
            return {
                nome: nextProps.editar.nome,
                descricao: nextProps.editar.descricao
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
        if (this.state.nome &&
            this.state.descricao) {
            let prod = {
                id: this.props.editar ?
                    this.props.editar.id : null,
                nome: this.state.nome,
                descricao: this.state.descricao,
            };
            this.props.onConfirmar(prod);
        } else {
            alert("Preencha todos os campos!");
        }

    }




    render() {

    		var items = this.props.cargos;

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
                    label="Descrição"
                    fullWidth
                    value={this.state.descricao}
                    onChange={(evento) => this.setValor('descricao', evento.target.value)}
                />



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