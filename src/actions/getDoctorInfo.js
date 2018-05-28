import constants from '../actions/constants';

export const getDoctorInfo = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(data => data.json())
        .then(json =>
            dispatch(gotDoctorInfoSuccess(json)
        )
    )
    .catch(err => dispatch(gotDoctorInfoFailure(err)))
}

export function gotDoctorInfoSuccess(data) {
    return {
        type: constants.GOT_DOCTOR_INFO,
        payload: data,
    }
}

export function gotDoctorInfoFailure() {
    return {
        type: constants.GOT_DOCTOR_INFO_ERROR
    }
}