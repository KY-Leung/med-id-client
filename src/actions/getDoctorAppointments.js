import constants from '../actions/constants';

export const getDoctorAppointments = () => dispatch => {
    fetch('http://med-id-server.herokuapp.com/doctor/1/appointment')
        .then(data => data.json())
        .then(json =>
            dispatch(gotDoctorAppointmentsSuccess(json)
        )
    )
    .catch(err => dispatch(gotDoctorAppointmentsFailure(err)))
}

export function gotDoctorAppointmentsSuccess(data) {
    return {
        type: constants.GOT_DOCTOR_APPOINTMENTS,
        payload: data,
    }
}

export function gotDoctorAppointmentsFailure() {
    return {
        type: constants.GOT_DOCTOR_APPOINTMENTS_ERROR
    }
}