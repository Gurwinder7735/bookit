import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";


const reducers = combineReducers({
    rooms: allRoomsReducer,
    roomDetails: roomDetailsReducer
})

export default reducers