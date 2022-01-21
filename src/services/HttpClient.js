import axios from "axios";

//Endpoint base
axios.defaults.baseURL = 'http://192.168.100.30:5000/api';

//Incluir token de seguridad a cualquiera peticion
axios.interceptors.request.use((configure) => {
    //Obtenemos el token almacenado en el navegador
    const token_seguridad = window.localStorage.getItem('token_seguridad');
    if(token_seguridad){
        //Pasamos el token al Header
        configure.headers.Authorization = 'Bearer ' + token_seguridad;
        return configure;
    }
}, error =>{
    return Promise.reject(error);
});

//Metodos
const requestGenerico = {
    get    : (url) => axios.get(url),
    post   : (url, body) => axios.post(url, body),
    put    : (url, body) => axios.put(url, body),
    delete : (url) => axios.delete(url)
};

export default requestGenerico;