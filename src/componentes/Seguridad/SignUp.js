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
import { registrarUsuario } from '../../actions/UsuarioAction';
  
  const theme = createTheme();
  
  export default function SignUp() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    const [usuario, setUsuario] = React.useState({
      Nombre : '',
      Apellidos : '',
      Username : '',
      Email : '',
      Password : '',
      ConfirmarPassword : ''
    });

    const ingresarValoresMemoria = cajaTexto => {
      const {name, value} = cajaTexto.target;
      setUsuario( anterior => ({
        ...anterior,
        [name] : value
        //Nombre
      }))
    }

    //Registrar Usuario
    const registrarUsuarioBoton = e => {
      e.preventDefault();
      registrarUsuario(usuario).then(response => {
        console.log('Se registro exitosamente el usuario', response);
        //Registrar Token en el Navegador
        window.localStorage.setItem("token_seguridad", response.data.token);
      });
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
              Registrar Usuario
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Nombre"//El name tiene que ser el mismo que el de la variable de estado
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    autoFocus
                    onChange={ingresarValoresMemoria}
                    value={usuario.Nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="apellidos"
                    label="Apellidos"
                    name="Apellidos"
                    autoComplete="family-name"
                    onChange={ingresarValoresMemoria}
                    value={usuario.Apellidos}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Nombre de Usuario"
                    name="Username"
                    autoComplete="family-name"
                    onChange={ingresarValoresMemoria}
                    value={usuario.Username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="Email"
                    autoComplete="email"
                    onChange={ingresarValoresMemoria}
                    value={usuario.Email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={ingresarValoresMemoria}
                    value={usuario.Password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="ConfirmarPassword"
                    label="Confirmar Password"
                    type="password"
                    id="ConfirmarPassword"
                    autoComplete="new-password"
                    onChange={ingresarValoresMemoria}
                    value={usuario.ConfirmarPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={registrarUsuarioBoton}
              >
                Registrarse
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#">
                    Ya tienes una cuenta?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }