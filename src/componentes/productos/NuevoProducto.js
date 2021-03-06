import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { guardarProducto } from '../../actions/ProductoAction';
import { useStateValue } from '../../context/store';


const theme = createTheme();

export const NuevoProducto = () => {

    const [{sesionUsuario}, dispatch] = useStateValue();

    const [producto, setProducto] = useState({
        nombre : "",
        marca : "",
        fabricante : "",
        precio : "",
        codigo_barra : ""
    });

    const resetearForm = () => {
        setProducto({
            nombre : "",
            marca : "",
            fabricante : "",
            precio : "",
            codigo_barra : ""
        });
    }

    const ingresarValoresMemoria = ct => {
        const {name, value} = ct.target;
        setProducto((anterior) =>({
            ...anterior,
            [name] : value
        }));
    }

    const guardarProductoBoton = e => {
        e.preventDefault();
        const objetoProducto = {
            nombre : producto.nombre,
            marca  : producto.marca,
            fabricante : producto.fabricante,
            precio : parseFloat(producto.precio || 0.0),
            codigo_barra : producto.codigo_barra
        };

        guardarProducto(objetoProducto).then(respuesta => {
            let mensaje = "";
            let success = false;
            if (respuesta.status == 200) 
            {
                mensaje = "Se guardo correctamente el producto! :)";
                success = true;
                resetearForm();
            }
            else 
            {
                mensaje = "No se pudo guardar el producto";
                success = false;
            }

            dispatch({
                type : "OPEN_SNACKBAR",
                openMensaje : {
                    open        : true,
                    typeMessage : success ? "success" : "error",
                    mensaje     : mensaje 
                }
            });
        });
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                />
                <Grid container justifyContent="center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddShoppingCartIcon />
                    </Avatar>
                </Grid>
                <Grid container justifyContent="center">
                    <Typography container component="h1" variant="h5" color="GrayText">
                        Registro de Nuevo Producto
                    </Typography>
                </Grid>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="nombre"
                                variant="outlined"
                                fullWidth
                                label="Nombre del producto"
                                value={producto.nombre}
                                onChange={ingresarValoresMemoria}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="marca"
                                variant="outlined"
                                fullWidth
                                label="Marca"
                                value={producto.marca}
                                onChange={ingresarValoresMemoria}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="fabricante"
                                variant="outlined"
                                fullWidth
                                label="Fabricante"
                                value={producto.fabricante}
                                onChange={ingresarValoresMemoria}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="precio"
                                variant="outlined"
                                fullWidth
                                label="Precio"
                                value={producto.precio}
                                onChange={ingresarValoresMemoria}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="codigo_barra"
                                variant="outlined"
                                fullWidth
                                label="Codigo de barras"
                                value={producto.codigo_barra}
                                onChange={ingresarValoresMemoria}/>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                size="large"
                                onClick={guardarProductoBoton}
                            >
                                Guardar Producto
                            </Button>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default NuevoProducto;