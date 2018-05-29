import { combineReducers } from 'redux';
import getDoctorInfo from './getDoctorInfo';
import postReducer from './postReducer';
import getDoctorAppointments from './getDoctorAppointments';
import getPatientMedicalRecord from './getPatientMedicalRecord';

export default combineReducers({
    currentDayAppointments: getDoctorAppointments,
    patientMedicalRecord: getPatientMedicalRecord,
    doctorInfo: getDoctorInfo,
    posts: postReducer,
});
