import { createContext, useReducer } from "react";
import AlertReducer from './AlertReducer';

// creates the context
const AlertContext = createContext();

//descructing and taking in the prop of children
export const AlertProvider = ({children}) => {
    // the inital state is equal to null
    const initialState = null

    // Set an alert for the reducer
    const setAlert = (msg, type) => {
        dispatch({
            //reducer types need to be like this
            type: 'SET_ALERT',
            payload: {msg, type}
        })

        //This basically sends this dispatch to the reducer after 3 seconds
        setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
    }

    // Using the reducer hook
    const [state, dispatch] = useReducer(AlertReducer, initialState)


    //the stuff that we are going to be using from the context
    return <AlertContext.Provider value={{alert: state, setAlert}}>
        {children}
    </AlertContext.Provider>

}

export default AlertContext