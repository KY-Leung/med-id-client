import constants from '../actions/constants';

export const getDoctorAppointments = () => dispatch => {
    let doctorId = window.location.pathname.substring(8,9);
    fetch('http://med-id-server.herokuapp.com/doctor/' + doctorId + '/appointment', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(data => data.json())
    .then(json =>
        dispatch(gotDoctorAppointmentsSuccess(json))
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