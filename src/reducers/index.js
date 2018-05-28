import { combineReducers } from 'redux';
import getDoctorInfo from './getDoctorInfo';
import postReducer from './postReducer';
import getDoctorAppointments from './getDoctorAppointments';

export default combineReducers({
    currentDayAppointments: getDoctorAppointments,
    doctorInfo: getDoctorInfo,
    posts: postReducer,
});
