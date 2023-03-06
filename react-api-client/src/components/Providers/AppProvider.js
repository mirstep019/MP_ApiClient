import {createContext, useReducer, useEffect} from "react";

const LOCAL_STORAGE_ID = "myTDApp";

export const CLEAR = "CLEAR";
export const RESET = "RESET";
export const SETUSER = "SETUSER";
//export const SETTOKEN = "SETTOKEN";
export const SETTRAINER = "SETTRAINER";

const initialState = {token: "", trainer:{}, userIds:[]};

let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));

const dataReducer = (state, action) => {
    switch (action.type) {
        case CLEAR: {
            return {...state, trainer: {}, userIds: []};
        }
        case RESET: {
            return  initialState;
        }
        
        case SETUSER:{
            const userIdsTest = [];
            for (const user of action.payload) {
              userIdsTest.push(user);
            }
            console.log(userIdsTest);
            return {...state, userIds: [...action.payload]};
          }
          
        case SETTRAINER:{
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