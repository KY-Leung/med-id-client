import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ConsultationSchedule.css';
import PatientInfoBlock from './PatientInfoBlock';
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';


//REDUX
import { connect } from 'react-redux';
import { getDoctorAppointments } from '../../../actions/getDoctorAppointments';

class ConsultationSchedule extends Component {

    componentWillMount() {
        this.props.getDoctorAppointments();
    }

    getListOfHours(currentDayAppointments) {
        let ListOfHours = [];

        currentDayAppointments.map((patient) => {
            let hour = patient.appointmentTime.substring(0, 2);

            if (!ListOfHours.includes(hour)) {
                ListOfHours.push(hour)
            }
        })
        return ListOfHours;
    }

    getTodayDate() {
        let today = new Date();
        let dd = today.getDate();
        let locale = "en-us";
        let todayDate = dd + ' ' + today.toLocaleString(locale, { month: "long" });

        return todayDate;
    }

    render() {
        let currentDayAppointments = this.props.currentDayAppointments;
        let ListOfHours = (currentDayAppointments.length > 1) ? this.getListOfHours(currentDayAppointments) : [];
        let todayDate = this.getTodayDate();

        return (
            <div>
                {ListOfHours.map((hour, index) => {
                    return <div className="ConsultationSchedule-HoulyBlock" key={index}>
                        <div className="ConsultationSchedule-DateTime">
                            <StyledContent fontSize="18px" style={{ width: '124px' }}>{todayDate} {hour}:00</StyledContent>
                            <hr/>
                        </div>
                        <div className="ConsultationSchedule-PatientsContainer">
                            {currentDayAppointments.map((patient, index) => {
                                if (patient.appointmentTime.substring(0, 2) == hour)
                                    return <PatientInfoBlock patient={patient}/>
                            })}
                        </div>
                    </div>
                    })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentDayAppointments: state.currentDayAppointments.currentDayAppointments
    }
}

const mapDispatchToProps = () => {
    return {
        getDoctorAppointments
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ConsultationSchedule);