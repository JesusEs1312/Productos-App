import { Button, Divider, Drawer, fabClasses, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useStateValue } from '../../context/store';
import { Link, useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
//Librerias Responsive de Material-Desing
const usesStyles = makeStyles((theme) => ({
    seccionDesktop : {
        display: "none",
        [theme.breakpoints.up('md')] : {
            display : "flex"
        }
    },
    seccionMobile : {
        display : "flex",
        [theme.breakpoints.up('md')] : {
            display : "none"
        }
    },
    grow : {
        flexGrow : 1
    },
    list : {
        width : 250
    },
    listItemText : {
        fontSize : "14px",
        fontWeight : 600,
        paddingLeft : "15px",
        color : "#212121"
    }
}));

const BarSesion = (props) => {
    const classes = usesStyles();
    //Constante para navegar a otra ruta
    const navigate = useNavigate();
    //Invocar variables globales
    const [{sesionUsuario}, dispatch] = useStateValue();
    // ----------Variables de Menu Izquierdo
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
    }
    const abrirMenu = () => {
        setAbrirMenuIzquierda(true);
    }
    //-------------Variables de Menu Derecho
    const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);
    const cerrarMenuDerecha = () => {
        setAbrirMenuDerecha(false);
    }
    const salirSesionApp = () => {
        localStorage.removeItem('token_seguridad');
        dispatch({
            type : "SALIR_SESION",
            nuevoUsuario : null,
            autenticado : false
        })
        navigate("/auth/signIn", {replace: true});
    }
    const abrirMenuDerechaAction = () => {
        setAbrirMenuDerecha(true);
    }
     const rutas = (ruta) =>{
         navigate(ruta, {replace: true});
     }

    return (
        <React.Fragment>
            {/*-------------- Menu Izquierdo --------- */}
            <Drawer
                open = {abrirMenuIzquierda}
                onClose = {cerrarMenuIzquierda}
                anchor = "left">
                <div className={classes.list} onKeyDown={cerrarMenuIzquierda} onClick={cerrarMenuIzquierda}>
                    <List>
                        <ListItem button onClick={() => rutas("/auth/perfil")}>
                            <AccountBoxIcon/>
                            <ListItemText classes={{primary : classes.listItemText}} primary="Perfil" />
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => rutas("/producto/nuevo")}>
                            <AddShoppingCartIcon/>
                            <ListItemText classes={{primary : classes.listItemText}} primary="Nuevo Producto"/>
                        </ListItem>
                        <ListItem button onClick={() => rutas("/producto/lista")}>
                            <InventoryIcon/>
                            <ListItemText classes={{primary : classes.listItemText}} primary="Lista Productos"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            {/*------------------ Menu Derecho -----------------*/}
            <Drawer 
                open={abrirMenuDerecha}
                onClose={cerrarMenuDerecha}
                anchor="right">
                    <div role="button" onClick={cerrarMenuDerecha} onKeyDown={cerrarMenuDerecha}>
                        <div className={classes.list}>
                            <List>
                                <ListItem button components={Link}>
                                    <ListItemText classes={{primary : classes.listItemText}} primary={sesionUsuario ? sesionUsuario.usuario.userName : ''}/>
                                </ListItem>
                                <ListItem button onClick={salirSesionApp}>
                                    <ListItemText classes={{primary : classes.listItemText}} primary="Salir"/>
                                </ListItem>
                            </List>
                        </div>
                    </div>
            </Drawer>
            {/* -----------ToolBar---------- */}
            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenu}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6">Productos</Typography>
                <div className={classes.grow}></div>
                <div className={classes.seccionDesktop}>
                    <Button color="inherit" onClick={salirSesionApp}>Salir</Button>
                    <Button color="inherit">{sesionUsuario ? sesionUsuario.usuario.userName : "Usuario"}</Button>
                </div>
                <div className={classes.seccionMobile}>
                    <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default BarSesion;