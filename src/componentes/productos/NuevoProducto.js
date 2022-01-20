import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const NuevoProducto = () => {

    const [producto, setProducto] = useState({
        nombre : '',
        marca : '',
        fabricante : '',
        precio : '',
        codigo_barra : ''
    });

    const ingresarValoresMemoria = ct => {
        const {name, value} = ct.target;
        setProducto((anterior) =>({
            ...anterior,
            [name] : value
        }));
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
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
                    <Typography container component="h1" variant="h5">
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