import React, {createContext, useContext, useReducer} from "react";

//Objeto de tipo contexto
export const StateContext = createContext();

//El objeto provider suscribe a todos los componenetes de tu proyecto
//La unica forma de cambiar un valor global(Variable de sesion global) es atraves de un Reducer
//children se refiere a todos los componenetes del proyecto
export const StateProvider = ({reducer, initialState, children}) => {
    //Suscribir a todos los componentes con estas caracteristicas
    return(<StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>);
};

//Consumer
export const useStateValue = () => useContext(StateContext);