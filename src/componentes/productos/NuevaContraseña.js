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
import { loginUsuario, nuevaContra, recuperarContraseña } from '../../actions/UsuarioAction';
import { useNavigate } from 'react-router';
import { useStateValue } from '../../context/store';

const theme = createTheme();

const NuevaContraseña = (props) => {
    const navigate = useNavigate();
    const [{sesionUsuario}, dispatch] = useStateValue();

    const [contras, setContras] = useState({
        Password1 : '',
        Password2 : '',
        Email     : sesionUsuario.usuario.email
      })
    
      const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setContras(anterior => ({
          ...anterior,
          [name] : value
        }))
      }

      const nuevaContraBoton = e => {
          e.preventDefault();
          nuevaContra(contras).then(response => {
              if(response.status == 200)
              {
                  navigate("/productos/auth/signIn", {replace: true});
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
            Nueva Contraseña
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Password1"
              label="Nueva Contraseña"
              name="Password1"
              type="password"
              autoFocus
              value={contras.Password1}
              onChange={ingresarValoresMemoria}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password2"
              label="Confirmar Nueva Contraseña"
              id="Password2"
              type="password"
              value={contras.Password2}
              onChange={ingresarValoresMemoria}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={nuevaContraBoton}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default NuevaContraseña;