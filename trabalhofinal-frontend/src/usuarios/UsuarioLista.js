import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class UsuarioLista extends React.Component {

    constructor() {
        super();
        this.state = {
      
        }
    }

    render() {
        if (!this.props.pagina ) {
            return <div>Sem Cadastros!</div>;
        } else {
            return <div><Table>
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell>NOME</TableCell>
                        <TableCell >EMAIL</TableCell>
                        <TableCell >LOGIN</TableCell>
              
                        <TableCell>PERMISSÕES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.pagina.content.map((usuario) => {
                        return (
                            <TableRow key={usuario.id}>
                                <TableCell >
                                    {usuario.id}
                                </TableCell>
                                <TableCell>{usuario.nome}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{usuario.login}</TableCell>
                      
                                <TableCell>{usuario.permissoes}</TableCell>
                                <TableCell style={{ border: "none" }} >
                                    <IconButton onClick={() => this.props.onEditar(usuario)} color="primary">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => this.props.onExcluir(usuario)} color="secondary">
                                        <Icon>delete</Icon>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            </div>
        }
    }
}