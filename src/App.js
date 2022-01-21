import './App.css';
import SignUp from './componentes/Seguridad/SignUp';
import SignIn from './componentes/Seguridad/SignIn';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Alert, Grid, Snackbar } from '@mui/material';
import AppNavBar from './navegacion/AppNavBar';
import { useStateValue } from './context/store';
import React, { useEffect, useState } from 'react';
import { obtenerUsuarioActual } from './actions/UsuarioAction';
import Perfil from './componentes/Seguridad/Perfil';
import { NuevoProducto } from './componentes/productos/NuevoProducto';
import Productos from './componentes/productos/Productos';
import Editar from './componentes/productos/EditarProducto';

//Componente React (Retorno un componente grafico)
//Utilizamos props para obtener los atributos del componente padre
function App() {
  //Obtener referencia ala variable global de sesion de usuario
  const [{sesionUsuario, openSnackBar}, dispatch] = useStateValue();
  //Variable local para saber si el usuario obtuvo la data
  const [iniciaApp, setIniciaApp] = useState(false);
  //Funcion para cuando inicie el componente
  useEffect(() =>{
    if(!iniciaApp)
    {
      //Obtener valor de usuario actual
      obtenerUsuarioActual(dispatch).then(response => {
        setIniciaApp(true);
      }).catch(error => {
        setIniciaApp(true)
      })
    }
  }, [iniciaApp]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{vertical:"bottom", horizontal:"center"}}
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={3000}
        ContentProps={{"aria-describedby": "message-id"}}
        onClose = {() => 
          dispatch({
            type:"OPEN_SNACKBAR",
            openMensaje : {
              open : false,
              typeMessage : "",
              mensaje : ""
            },
          })
        }
      >
        <Alert severity={openSnackBar ? openSnackBar.typeMessage : "success"} sx={{width: '100%'}}>
          <span id="message-id">{openSnackBar ? openSnackBar.mensaje : ""}</span>
        </Alert>
      </Snackbar>
      <Router>
        <Grid container>
          <AppNavBar/>
          <Routes>
            <Route path="/auth/signIn" element={<SignIn/>}></Route>
            <Route path="/auth/signUp" element={<SignUp />}></Route>
            <Route path="/" element={<SignIn />}></Route>
            <Route path={sesionUsuario ? "/auth/perfil" : "/"} element={sesionUsuario ? <Perfil /> : <SignIn/>}></Route>
            <Route path={sesionUsuario ? "/producto/nuevo" : "/"} element={sesionUsuario ? <NuevoProducto /> : <SignIn/>}></Route>
            <Route path={sesionUsuario ? "/producto/editar" : "/"} element={sesionUsuario ? <Editar /> : <SignIn/>}></Route>
            <Route path={sesionUsuario ? "/producto/lista" : "/"} element={sesionUsuario ? <Productos /> : <SignIn/>}></Route>
          </Routes>
        </Grid>
      </Router>
    </React.Fragment>
  );
}

export default App;
