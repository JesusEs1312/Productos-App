import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUsuario } from '../../actions/UsuarioAction';
import { useNavigate } from 'react-router';
import { useStateValue } from '../../context/store';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [{usuarioSesion}, dispatch] = useStateValue();

  const [usuario, setUsuario] = React.useState({
    Email    : '',
    Password : ''
  })

  const ingresarValoresMemoria = e => {
    const {name, value} = e.target;
    setUsuario(anterior => ({
      ...anterior,
      [name] : value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const loginUsuarioBoton = e => {
    e.preventDefault();
    loginUsuario(usuario, dispatch).then(response => {
      if(response.status == 200){
        window.localStorage.setItem("token_seguridad", response.data.token);
        navigate("/auth/perfil");
      } else {
        dispatch({
          type : "OPEN_SNACKBAR",
          openMensaje : {
            open : true,
            typeMessage : "error",
            mensaje :  "Credenciales Incorrectas!"
          }
        });
      }
    })
  }

  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="Email"
              autoComplete="email"
              autoFocus
              value={usuario.Email}
              onChange={ingresarValoresMemoria}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={usuario.Password}
              onChange={ingresarValoresMemoria}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginUsuarioBoton}
            >
              Iniciar
            </Button>
            <Grid container>
              <Grid item xs={6} justifyItems="center" justifyContent="center">
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item xs={6} justifyItems="center" justifyContent="center">
                <Link href="#" variant="body2">
                  {"Aun no tienes una cuenta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}