import { combineReducers } from "redux";
import { allRoomsReducer } from "./roomReducer";


const reducers = combineReducers({
    rooms: allRoomsReducer 
})

export default reducers