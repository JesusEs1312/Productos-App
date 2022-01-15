import React from "react";
import { AppBar } from "@mui/material";
import BarSesion from "./bar/BarSesion";

//Layout (Reserva el espacio)
const AppNavBar = () => {
    return (
        <AppBar position="static">
            <BarSesion></BarSesion>
        </AppBar>
    );
}

export default AppNavBar;