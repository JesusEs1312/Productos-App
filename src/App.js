// import logo from './logo.svg';
import './App.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import theme from './theme/theme';
// import { Button, TextField } from '@material-ui/core';
import SignUp from './componentes/Seguridad/SignUp';
//Componente React (Retorno un componente grafico)
//Utilizamos props para obtener los atributos del componente padre
function App() {
  return (
    <div className="App">
      {/* <MuiThemeProvider theme={theme}>
        <h1>Proyecto en blanco</h1>
        <TextField variant="outlined"></TextField>
        <Button variant="contained" color="primary">Puchale</Button>
      </MuiThemeProvider>
      */}
      <SignUp></SignUp>
    </div>
  );
}

export default App;
