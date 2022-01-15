import './App.css';
import SignUp from './componentes/Seguridad/SignUp';
import SignIn from './componentes/Seguridad/SignIn';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import AppNavBar from './navegacion/AppNavBar';

//Componente React (Retorno un componente grafico)
//Utilizamos props para obtener los atributos del componente padre
function App() {
  return (
    <Router>
      <Grid container>
        <AppNavBar/>
        <Routes>
          <Route path="/auth/signIn" element={<SignIn/>}></Route>
          <Route path="/auth/signUp" element={<SignUp />}></Route>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </Grid>
    </Router>
  );
}

export default App;
