import constants from '../actions/constants';

export const postPatientMedicalRecord = (newMedicalRecord) => dispatch => {
    fetch('https://med-id-server.herokuapp.com/healthrecord/cecilia_rosewood', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            healthrecord: newMedicalRecord
        })
    })
    .then(data => console.log(data))
    // .then(json =>
    //     dispatch(postPatientMedicalRecordSuccess(json))
    // )
    // .catch(err => dispatch(postPatientMedicalRecordFailure(err)))
}

export function postPatientMedicalRecordSuccess(data) {
    return {
        type: constants.POSTED_PATIENT_MEDICAL_RECORD,
        payload: data,
    }
}

export function postPatientMedicalRecordFailure() {
    return {
        type: constants.POSTED_PATIENT_MEDICAL_RECORD_ERROR
    }
}