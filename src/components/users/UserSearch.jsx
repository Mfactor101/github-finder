import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import {searchUsers} from '../../context/github/GithubActions'

function UserSearch() {
    //creating the state 
    const [text, setText] = useState('')


    //bringing in the users and the search users function to use from the context
    const {users, dispatch} = useContext(GithubContext)

    //Bringing in set alert from the context
    const {setAlert} = useContext(AlertContext)

    //Sets the state to the text that the input fielf has 
    const handleChange = (e) => setText(e.target.value)

    //event that happens when a user clicks on the submit button
    const handleSubmit = async (e) => {

        //prevents the default action from happening
        e.preventDefault()

        //if there is no text in the state there will be an alert
        if(text === ''){
            setAlert('Please enter something', 'error')

        }else{
            dispatch({type: 'SET_LOADING'})
            //calls the fucntion in the context and we are passing the text from our state into it
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})
            setText('')
        }
    }

  return (
      //fancy class stuff for stlyuing 
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" placeholder="Search" value={text} onChange={handleChange}/>
                        <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                            Go
                        </button>
                    </div>
                </div>
            </form>
        </div>

        {/* This div only shows when there is users in the state */}
        {users.length > 0 && (
            <div>
            <button onClick={() => dispatch({type: 'CLEAR_USERS'})} className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div>
        )}
        
    </div>
  )
}

export default UserSearch