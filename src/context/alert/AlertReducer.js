const alertReducer = (state, action) => {
    switch(action.type){
        //when we get set alert lets return the whole payload 
        case 'SET_ALERT':
            return action.payload
        //when we get remove alert we will just return nothing
        case 'REMOVE_ALERT':
            return null
        //If nothing happens just return the current state
        default:
            return state
    }
}

//exports all of the stuff we defined to the state
export default alertReducer