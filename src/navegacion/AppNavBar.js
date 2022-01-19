import React from "react";
import { AppBar } from "@mui/material";
import BarSesion from "./bar/BarSesion";
import { useStateValue } from "../context/store";

//Layout (Reserva el espacio)
const AppNavBar = () => {
    const [{sesionUsuario}, dispatch] = useStateValue();
    return sesionUsuario
        ? (sesionUsuario.autenticado == true ? <AppBar position="static"><BarSesion/></AppBar> : null)
        : null;
    // return (
    //     <AppBar position="static">
    //         <BarSesion></BarSesion>
    //     </AppBar>
    // );
}

export default AppNavBar;