import { createContext, useReducer } from "react";


export const SongContext = createContext();




//state is previous state value
export function songsReducer(state, action) {
    switch (action.type) {
        case 'SET_SONGS':
            return {
                //entire array of songs we get from the database.
                songs: action.payload
            }
        case 'CREATE_SONG':
            return {
                //get the new song and append to the previous songs 
                songs: [action.payload, ...state.songs]
            }
        case 'DELETE_SONG':
            return {
                //filter out the deleted song
                songs: state.songs.filter((song) => song._id !== action.payload._id)
            }
            case 'UPDATE_SONG':
                return {

                    //replace the old song with the new one
                    songs: state.songs.map((song) => song._id === action.payload._id ? action.payload : song)
                    
                    //songs: state.songs.map((song) => song._id === action.payload._id ? action.payload : song)
                }
        default:
            return state;
    }
}


export function SongContextProvider( { children } ) {


    //we pass to reducer a reducer fxn name called songsReducer
    const [state, dispatch] = useReducer(songsReducer, {
        songs: null
    });



    return (
        <SongContext.Provider value={{...state, dispatch}}>

            {children}

        </SongContext.Provider>
    )
}


