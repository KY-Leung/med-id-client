import constants from '../actions/constants';

const initialState = {
  people: [],
  isFetching: false,
  error: false
}

export default function getDoctorInfo (state = initialState, action) {
    switch (action.type) {
        case constants.GETTING_DOCTOR_INFO:
        return {
            ...state,
            isFetching: true
        }
        case constants.GOT_DOCTOR_INFO:
        return {
            ...state,
            isFetching: false,
            people: action.payload
        }
        case constants.GOT_DOCTOR_INFO_ERROR:
        return {
            ...state,
            isFetching: false,
            error: true
        }
        default:
        return state
    }
}