import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import React from 'react';

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
    }
}));

const BarSesion = () => {
    const classes = usesStyles();

    return (
        <Toolbar>
            <IconButton color="inherit">
                <i className="material-icons">menu</i>
            </IconButton>
            <Typography variant="h6">Productos</Typography>
            <div className={classes.grow}></div>
            <div className={classes.seccionDesktop}>
                <Button color="inherit">Salir</Button>
                <Button color="inherit">{"Nombre de usuario"}</Button>
            </div>
            <div className={classes.seccionMobile}>
                <IconButton color="inherit">
                    <i className="material-icons">more_vert</i>
                </IconButton>
            </div>
        </Toolbar>
    );
};

export default BarSesion;