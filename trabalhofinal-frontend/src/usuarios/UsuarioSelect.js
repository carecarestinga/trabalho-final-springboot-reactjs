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

export default class UsuarioSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


          handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    render() {
        if (!this.props.pagina ) {
            return <div>Sem Cadastros!</div>;
        } else {
  return <div>
                <Select name="usuario" id="usuario" 
                label="Usuario"
            
                value={this.props.usuario}
                onChange={this.handleChange}
                >
                <option value="">Selecione o Usuario</option>
                {
                    
                   this.props.pagina.content.map(usuario=>{
                        return(<option key={usuario.id} 
                            value={usuario.id}>{usuario.id}-{usuario.nome}</option>)                                    })     
                }
                </Select> 

            </div>
        }
    }
}