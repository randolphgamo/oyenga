import { useAuthContext } from "./useAuthContext";


//to logout a user we don't need to send info to the backend
//we simple remove the user from local storage
//and update the auth context
export const useLogout = () => {
    
    const { dispatch } = useAuthContext();

    const logout = () => {

        //remove user from local storage
        localStorage.removeItem("user");

        //update auth context
        dispatch({ type: "LOGOUT" });
                
    }

    return { logout }

}