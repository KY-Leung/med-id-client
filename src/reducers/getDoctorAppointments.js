import constants from '../actions/constants';

const initialState = {
    currentDayAppointments: []
}

export default function getDoctorInfo (state = initialState, action) {
    switch (action.type) {
        case constants.GOT_DOCTOR_APPOINTMENTS:
            return {
                ...state,
                isFetching: false,
                currentDayAppointments: action.payload.current_day_appointments
            }
        case constants.GOT_DOCTOR_APPOINTMENTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
        return state
    }
}