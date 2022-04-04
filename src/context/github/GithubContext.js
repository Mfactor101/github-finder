import {createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

//creates a context
const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    return (

        //passing in the state and the fucntions so we can use them anywhere 
        <GithubContext.Provider 
            value={{
                ...state,
                dispatch,
            }}
            >
            {children}
        </GithubContext.Provider>    
    )
}

export default GithubContext