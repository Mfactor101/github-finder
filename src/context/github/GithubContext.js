import {createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

//creates a context
const GithubContext = createContext()


//gets all the tokens and github url from our env file
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)



    // Get search results from the text that we pass in from the user search
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        //this is the end point that we are hitting from the api
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        //when we send the request we get an object back in return so we are destructing the item object to get the data we need
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }


    // Get a single user
    const getUser = async (login) => {
        setLoading()

        //this is the end point that we are hitting from the api
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        //If the user doesn't exist redirec tot 404
        if (response.status === 404){
            window.location = '/notfound'
        }else{
            //setting the response to a data variable
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }

        //when we send the request we get an object back in return so we are destructing the item object to get the data we need
    }


    //Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        //These are the params that we will put into the endpoint, here we want the most recent repos
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10 
        })

        //this is the end point that we are hitting from the api
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        //when we send the request we get an object back in return so we are destructing the item object to get the data we need
        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    //Clear usrs from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    //Set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return (

        //passing in the state and the fucntions so we can use them anywhere 
        <GithubContext.Provider 
            value={{
                users: state.users,
                loading: state.loading,
                user: state.user,
                repos: state.repos,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}
            >
            {children}
        </GithubContext.Provider>    
    )
}

export default GithubContext