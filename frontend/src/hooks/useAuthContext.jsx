import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";




export const useAuthContext = () =>  {

    //this context will now have the state and dispatch values that are provided with usecontext provider
   const context = useContext(AuthContext);

    return context;
}