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
import { loginUsuario, recuperarContraseña } from '../../actions/UsuarioAction';
import { useNavigate } from 'react-router';
import { useStateValue } from '../../context/store';

const theme = createTheme();

const RecuperarContraseña = (props) => {
    const navigate = useNavigate();
    const [{sesionUsuario}, dispatch] = useStateValue();

    const [emails, setEmails] = useState({
        EmailLogin      : '',
        EmailParaCodigo : ''
      })
    
      const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setEmails(anterior => ({
          ...anterior,
          [name] : value
        }))
      }

      const recuperarContra = e => {
          e.preventDefault();
          recuperarContraseña(emails, dispatch).then(response => {
              if(response.status == 200)
            {
                sesionUsuario.usuario.email = emails.EmailLogin;
                navigate("/productos/usuario/ValidarCodigo");                
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
            Recuperar Contraseña
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="EmailLogin"
              label="Correo Electronico"
              name="EmailLogin"
              autoComplete="email"
              autoFocus
              value={emails.EmailLogin}
              onChange={ingresarValoresMemoria}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="EmailParaCodigo"
              label="Correo Electronico de Contacto"
              id="password"
              value={emails.EmailParaCodigo}
              onChange={ingresarValoresMemoria}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={recuperarContra}
            >
              Enviar Código
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default RecuperarContraseña;