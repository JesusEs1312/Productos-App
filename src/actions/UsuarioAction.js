import HttpClient from '../services/HttpClient';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

//Registrar nuevo usuario
export const registrarUsuario = usuario => {
    return new Promise((resolve, eject) => {
        instancia.post('/usuario/registrar', usuario).then(response => {
            resolve(response);
        })
    });
};

// TODO: Obtener Usuario 
export const obtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/usuario').then((response) => {
            //Llamar al reducer
            dispatch({
                type        : "INICIAR_SESION",
                sesion      : response.data,
                autenticado : true
            });
            resolve(response);
        })
    });
};
// TODO: Actuazlizar Usuario
export const actualizarUsuario = (usuario) => {
    return new Promise((resolve, eject) => {
        HttpClient.put('/usuario', usuario).then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores)
        })
    });
};

//Logear Usuario
export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.post("/usuario/login", usuario).then(response => {
            dispatch({
                type : "INICIAR_SESION",
                sesion : response.data,
                autenticado : true
            })
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    });
};

export const recuperarContraseña = (emails, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.put("/usuario/actualizarContrasena", emails).then(response => {
            dispatch({
                type : "NUEVA_CONTRASEÑA",
                sesion : response.data,
                autenticado : false
            })
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores);
        })
    })
}

export const validarCodigo = (codigos) => {
    return new Promise((resolve, eject) => {
        instancia.post("/usuario/validarCodigo", codigos).then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores);
        })
    })
}

export const nuevaContra = (contras) => {
    return new Promise((resolve, eject) => {
        instancia.post("/usuario/nuevaContra", contras).then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores);
        })
    })
}