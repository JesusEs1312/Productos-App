// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';
// import { Avatar } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import { useStateValue } from '../../context/store';
  
//   const theme = createTheme();
  
//    const Perfil = () => {
//     const [dispatch] = useStateValue();
//     const [usuario, setUsuario] = React.useState({
//       Nombre : '',
//       Apellidos : '',
//       Username : '',
//       Email : '',
//       Password : '',
//       ConfirmarPassword : ''
//     });

//     const ingresarValoresMemoria = cajaTexto => {
//       const {name, value} = cajaTexto.target;
//       setUsuario( anterior => ({
//         ...anterior,
//         [name] : value
//         //Nombre
//       }))
//     }

//     React.useEffect(() => {
//         obtenerUsuarioActual(dispatch).then(response => {
//             setUsuario(response.data);
//         });
//     }, [])

//     //Actualizar usuario
//     const guardarUsuario = e => {
//       e.preventDefault();
//       actualizarUsuario(usuario).then(response => {
//           if(response.status == 200)
//           {
//             dispatch({
//                 type : "OPEN_SNACKBAR",
//                 openMensaje : {
//                     open : true,
//                     mensaje : "Se guardaron exitosamente los cambios del Perfil de Usuario"
//                 }
//             })
//             //Actualizar token
//             window.localStorage.setItem("token_seguridad", response.data.token);
//           } else
//           {
//               dispatch({
//                   type : "OPEN_SNACKBAR",
//                   openMensaje : {
//                       open : true,
//                       mensaje : "Errores al intentar guardar en : " + Object.keys(response.data.errors) 
//                   }
//               })
//           }
//       })
//     }
  
//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <PersonIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Perfil de Usuario
//             </Typography>
//             <Box component="form" noValidate sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="Nombre"//El name tiene que ser el mismo que el de la variable de estado
//                     required
//                     fullWidth
//                     id="nombre"
//                     label="Nombre"
//                     autoFocus
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.Nombre}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="apellidos"
//                     label="Apellidos"
//                     name="Apellidos"
//                     autoComplete="family-name"
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.Apellidos}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="username"
//                     label="Nombre de Usuario"
//                     name="Username"
//                     autoComplete="family-name"
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.Username}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email"
//                     name="Email"
//                     autoComplete="email"
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.Email}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="Password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.Password}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="ConfirmarPassword"
//                     label="Confirmar Password"
//                     type="password"
//                     id="ConfirmarPassword"
//                     autoComplete="new-password"
//                     onChange={ingresarValoresMemoria}
//                     value={usuario.ConfirmarPassword}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 onClick={guardarUsuario}
//               >
//                 Actualizar datos
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }

//   export default Perfil;