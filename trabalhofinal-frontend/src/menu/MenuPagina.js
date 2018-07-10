import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import logo from './trabalhofinal_img02.png';
import Typography from '@material-ui/core/Typography';
import FuncionarioPagina from '../funcionarios/FuncionarioPagina';
import DepartamentoPagina from '../departamentos/DepartamentoPagina';
import CargoPagina from '../cargos/CargoPagina';
import BasicExample from './BasicExample';
import Footer from './Footer';
import './MenuPagina.css';


export default class MenuPagina extends React.Component {
    render() {
        return <Grid container justify="center" alignItems="stretch" >

            <Grid item xs="15" md="14" lg="12"   >
                <Paper style={{ height: "100%" }}>
                    <AppBar position="static" style={{ height: "60px" }}>
                        <Toolbar id="toolbar" > <img src={logo}  /></Toolbar>
                    </AppBar>
                    <div style={{ marginLeft: "15px", height: "calc(100% - 60px)", overflow: "auto" }}>
                        <BasicExample />

                    </div>
                    <AppBar position="static" alignItems="stretch" style={
                        { 
                        alignItems: "center",
                        height: "40px", 
                    }}>
                        <Footer />
                    </AppBar>
                    
                </Paper>

            </Grid>
            
        </Grid>
    }

}

