import openSnackBarReducer from "./OpenSnackBarReducer";
import sesionUsuarioReducer from "./SesionUsuarioReducer";

//Unificacion de todos los reducer en uno solo
export const mainReducer = ({sesionUsuario, openSnackBar}, action) => {
    return {
        sesionUsuario : sesionUsuarioReducer(sesionUsuario, action),
        openSnackBar  : openSnackBarReducer(openSnackBar, action)
    }
};
 