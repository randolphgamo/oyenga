import { SongContext } from "../context/SongContext";
import { useContext } from "react";




export const useSongsContext = () =>  {

    //this context will now have the state and dispatch values that are provided with usecontext provider
   const context = useContext(SongContext);

    return context;
}



