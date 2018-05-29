import constants from '../actions/constants';

export const getPatientMedicalRecord = () => dispatch => {
    fetch('http://med-id-server.herokuapp.com/healthrecord/cecilia_rosewood')
        .then(data => data.json())
        .then(json =>
            dispatch(gotPatientMedicalRecordSuccess(json)
        )
    )
    .catch(err => dispatch(gotPatientMedicalRecordFailure(err)))
}

export function gotPatientMedicalRecordSuccess(data) {
    return {
        type: constants.GOT_PATIENT_MEDICAL_RECORD,
        payload: data,
    }
}

export function gotPatientMedicalRecordFailure() {
    return {
        type: constants.GOT_PATIENT_MEDICAL_RECORD_ERROR
    }
}