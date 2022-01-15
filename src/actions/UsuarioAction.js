import HttpClient from '../services/HttpClient';

//Registrar nuevo usuario
export const registrarUsuario = usuario => {
    return new Promise((resolve, eject) => {
        HttpClient.post('/usuario/registrar', usuario).then(response => {
            resolve(response);
        })
    })
}

//TODO: Obtener Usuario actual
//TODO: Actuazlizar Usuario

//Logear Usuario
export const loginUsuario = usuario => {
    return Promise((resolve, reject) => {
        HttpClient.post("/usuario/login", usuario).then(response => {
            resolve(response);
        });
    });
}