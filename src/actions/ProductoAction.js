import HttpClient from '../services/HttpClient';

export const guardarProducto = (producto) => {
    return new Promise((resolve, eject) => {
        HttpClient.post('/producto', producto).then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores);
        })
    });
}

export const obtenerProductos = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpClient.get("/producto").then(response => {
            dispatch({
                type        : "INICIAR_SESION",
                sesion      : response.data,
                autenticado : true
            });
            resolve(response);
        })
        .catch(error => {
            resolve(error.response.data.errores);
        });
    });
}

export const eliminarProducto = (id) => {
    return new Promise((resolve, eject) => {
        HttpClient.delete("/producto/" + id).then(response => {
            resolve(response);
        });
    });
};

export const obtenerPorductoPorId = (id) => {
    return new Promise((resolve, eject) => {
        HttpClient.get("/producto/" + id).then(response => {
            resolve(response);
        });
    });
};

export const editarProducto = (producto, id) => {
    return new Promise((resolve, eject) => {
        HttpClient.put("/producto/" + id, producto).then(response => {
            resolve(response);
        });
    });
};