import { createContext, useEffect, useReducer } from "react";


export const AuthContext = createContext()


//the function takes the previous state and an action
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {

                //return a user object with a payload
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
            default:
                return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        //initial state of user
        //he is not login so null.
        user: null
    })


    //this is to check if there is the presence of a token
    //in user storage which implies user is logged in
    // it is necessary because without it upon manual page reload
    //auth context is null 

    //it fires only once, when page is loaded
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {

            dispatch({ type: 'LOGIN', payload: user })
        }


        
    }, [])


    console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>

                {children}
            </AuthContext.Provider>
    )


}