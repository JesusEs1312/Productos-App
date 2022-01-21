//Valores que se almacenaran en el estado incial
export const initialState = {
    //Alamacenar datos del usuario
    usuario : {
        nombre            : '',
        apellidos         : '',
        email             : '',
        username          : '',
        productoId        : ''
    },
    autenticado : false
}

//Data que va a modificarse
const sesionUsuarioReducer = (state = initialState, action) => {
    switch(action.type) {
        case "INICIAR_SESION" : 
            return {
                ...state,
                usuario     : action.sesion,
                autenticado : action.autenticado
            };
        case "SALIR_SESION" :
            return {
                ...state,
                usuario     : action.nuevoUsuario,
                autenticado : action.autenticado
            }
        case "ACTUALIZAR_USUARIO" :
            return {
                ...state,
                usuario     : action.nuevoUsuario,
                autenticado : action.autenticado
            }
        default : return state;
    }
};

export default sesionUsuarioReducer;