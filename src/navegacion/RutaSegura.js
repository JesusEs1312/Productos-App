import { Route } from "@mui/icons-material";
import React from "react";
import { useStateValue } from '../context/store';
import { useNavigate } from 'react-router-dom';

function RutaSegura({component : Component, ...rest}) {
    const [{sesionUsuario}, dispatch] = useStateValue();
    const navigate = useNavigate();
    return(
        <Route
            {...rest}
            render = {(props) =>
                sesionUsuario ? (
                    sesionUsuario.autenticado == true ? (
                        <Component {...props} {...rest} />
                    )
                    : navigate("/auth/signIn", {replace: true})
                )
                : navigate("/auth/signIn", {replace: true})
            }
        />
    );
}

export default RutaSegura;