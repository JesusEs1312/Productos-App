import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUsuario, recuperarContraseña, validarCodigo } from '../../actions/UsuarioAction';
import { useNavigate } from 'react-router';
import { useStateValue } from '../../context/store';

const theme = createTheme();

const ValidarCodigo = (props) => {
    const navigate = useNavigate();
    const [{sesionUsuario}, dispatch] = useStateValue();
    const [codigo, setCodigo] = useState({
        CodigoLogin : '',
        Email : sesionUsuario.usuario.email
    })
    
      const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setCodigo(anterior => ({
          ...anterior,
          [name] : value
        }))
      }

      const validarCodigoBoton = e => {
          e.preventDefault();
          validarCodigo(codigo).then(response =>{
            if(response.status == 200)
            {
                navigate("/productos/usuario/nuevaContra");                
            } 
            else 
            {
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                      open : true,
                      typeMessage : "error",
                      mensaje :  (response.mensaje == null) ? "ERROR: " + response : "ERROR: " + response.mensaje
                    }
                });
            }
          })
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
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar el Código
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Codigo"
              label="Código de 4 digitos"
              name="CodigoLogin"
              autoFocus
              type="number"
              value={codigo.CodigoLogin}
              onChange={ingresarValoresMemoria}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={validarCodigoBoton}
            >
              Validar Código
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default ValidarCodigo;