import {createContext, useReducer, useEffect} from "react";

const LOCAL_STORAGE_ID = "myTDApp";

export const CLEAR = "CLEAR";
export const RESET = "RESET";
//export const SETTOKEN = "SETTOKEN";
export const SETTRAINER = "SETTRAINER";

const initialState = {token: "", trainer:{}};

let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));

const dataReducer = (state, action) => {
    switch (action.type) {
        case CLEAR: {
            return {...state, trainer: {}};
        }
        case RESET: {
            return  initialState;
        }
        // case SETTOKEN: {
        //     return {...state, token: action.payload}
        // }
        // case SETTRAINER:{
        //     return {...state, token: action.payload}
        // }
        case SETTRAINER:{
            // console.log(action.payload)
            // trainer.name = action.payload.trainerName
            // trainer.token = action.payload.token
            return {...state, trainer: action.payload}
        }
        default: {
            return state;
        }
    }
}

export const Context = createContext();

export const Provider = ({children, ...rest}) => {
    const [store, dispatch] = useReducer(dataReducer, storedData || initialState);
    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
    },[store])
    return (
        <Context.Provider value={[store, dispatch]}>
            {children}
        </Context.Provider>
    );
}