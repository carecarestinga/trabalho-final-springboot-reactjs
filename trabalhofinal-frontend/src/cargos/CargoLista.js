import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class CargoLista extends React.Component {

    constructor() {
        super();
        this.state = {
      
        }
    }

    render() {
        if (!this.props.pagina || !this.props.pagina.content.length) {
            return <div>Sem Cadastros!</div>;
        } else {
            return <div><Table>
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell>NOME</TableCell>
                        <TableCell >DESCRIÇÂO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.pagina.content.map((cargo) => {
                        return (
                            <TableRow key={cargo.id}>
                                <TableCell >
                                    {cargo.id}
                                </TableCell>
                                <TableCell>{cargo.nome}</TableCell>
                                <TableCell>{cargo.descricao}</TableCell>
                                <TableCell style={{ border: "none" }} >
                                    <IconButton onClick={() => this.props.onEditar(cargo)} color="primary">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => this.props.onExcluir(cargo)} color="secondary">
                                        <Icon>delete</Icon>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
                <TablePagination
                    component="div"
                    count={this.props.pagina.totalElements}
                    rowsPerPage={this.props.pagina.size}
                    page={this.props.pagina.number}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    labelRowsPerPage="Itens por página:"
                    onChangePage={(_, pagina) => { this.props.onMudaPagina(pagina) }}
                    onChangeRowsPerPage={
                        (event) => {
                            this.props.onMudaTamanho(event.target.value);
                        }

                    }
                />
            </div>
        }
    }
}