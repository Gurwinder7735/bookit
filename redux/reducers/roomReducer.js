import * as roomConstants from '../constants/roomConstants'

const initialState = {
    rooms : [],
    error: ''
}

export const allRoomsReducer = (state = initialState,action)=>{

    switch (action.type) {
        case roomConstants.ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                // roomsPerPage: action.payload.roomsPerPage,
                // filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.rooms,
            }
        case roomConstants.ALL_ROOMS_FAILED :
            return {
                error: action.payload
            }

        case roomConstants.CLEAR_ERRORS :
            return {
                ...state,
                error: null
            }
    
        default:
            return state
    }

}