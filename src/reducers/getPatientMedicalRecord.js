import constants from '../actions/constants';

const initialState = {
    patientMedicalRecord: {
        "name": "",
        "phone": "",
        "lastAppt": "",
        "age": "",
        "gender": "",
        "height": "",
        "weight": "",
        "currentMedications": [],
        "allergies": [],
        "familyHistory": [],
        "medicalConditions": [],
        "medicalHistory": []
    }
}

export default function getPatientMedicalRecord (state = initialState, action) {
    switch (action.type) {
        case constants.GOT_PATIENT_MEDICAL_RECORD:
            return {
                ...state,
                isFetching: false,
                patientMedicalRecord: JSON.parse(action.payload.healthrecord)
            }
        case constants.GOT_PATIENT_MEDICAL_RECORD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
        return state
    }
}