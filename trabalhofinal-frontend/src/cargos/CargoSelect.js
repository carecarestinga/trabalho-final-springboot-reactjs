import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

export default class CargoSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           cargo:'',
           cargo_id: ''
        }
    }

    setValor(campo, valor) {
        this.setState(
            (anterior) => {
                anterior[campo] = valor;
                return anterior;
            }
        );

    }

      handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



render() {
        if (!this.props.pagina || !this.props.pagina.content.length ) {
            return <div>Sem Cadastros!</div>;
        } else {
return <div>
                <Select name="cargo" id="cargo" 
                label="Cargo"
               
                value={this.state.cargo.id}
                onChange={this.handleChange}
                >
                <option value="">Selecione o Cargo</option>
                {
                    
                   this.props.pagina.content.map(cargo=>{
                        return(<option key={cargo.id} 
                            value={cargo.id}>{cargo.id}-{cargo.nome}-{cargo.descricao}</option>)                                    })     
                }
                </Select> 
        </div>
        }
    }
}