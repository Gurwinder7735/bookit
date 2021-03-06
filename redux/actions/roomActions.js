import axios from "axios";
import * as roomConstants from '../constants/roomConstants'
import absoluteUrl from "next-absolute-url";

export const getAllRooms = (req) => async (dispatch) => {

    try {

        const { origin } = absoluteUrl(req)

        const { data } = await axios.get(`${origin}/api/rooms`)

        console.log(data)
        dispatch(allRoomsSuccess(data.data))


    } catch (err) {
        dispatch(allRoomsFailed(err.response.data.message))
    }

}
export const getSingleRoom = (req,id) => async (dispatch) => {

    try {

        const { origin } = absoluteUrl(req)

        const { data } = await axios.get(`${origin}/api/rooms/${id}`)

        console.log(data)
        dispatch(roomDetailsSuccess(data.data))


    } catch (err) {
        dispatch(roomDetailsFailed(err.response.data.message))
    }

}

const allRoomsFailed = (payload) => ({
    type: roomConstants.ALL_ROOMS_FAILED,
    payload
})

const allRoomsSuccess = (payload) => ({
    type: roomConstants.ALL_ROOMS_SUCCESS,
    payload
})

const roomDetailsFailed = (payload) => ({
    type: roomConstants.ROOM_DETAILS_FAILED,
    payload
})

const roomDetailsSuccess = (payload) => ({
    type: roomConstants.ROOM_DETAILS_SUCCESS,
    payload
})

const clearErrors = () => async (dispatch) => {
    dispatch({
        type: roomConstants.CLEAR_ERRORS
    })
}