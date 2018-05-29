import React, {Component} from 'react';

import './ConsultationSchedule.css';

import { Link } from 'react-router-dom'

import { Card } from '../../common/Card/Card';
import { formatTime } from '../../common/formatTime';
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

import doctorLogo from '../../../assets/images/person1.jpg';
import Button from '@material-ui/core/Button';


class PatientInfoBlock extends Component {
    
    onStartSession = (event) => {
        
    }

    toggleStartSessionButton = (toggleStartSessionButton) => {
        // var time = new Date();
        // let timeNow = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2);

        // let startSession = timeNow > appointmentTime;
    
        if (toggleStartSessionButton) {
            return (
                <Link to='/patient'>
                    <Button onClick={this.onStartSession} variant="raised" color="primary" style={{margin: '30px 0px 10px 0px'}}>
                        Start Session
                    </Button>
                </Link>    
            )
        } else {
            return (
                <Button color="primary" style={{margin: '30px 0px 10px 0px'}}>
                    More Details
                </Button>
            )
        }
    }

    render() {
        return (
            <Card style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flex: 1, padding: '20px', height: '190px' ,maxWidth: '440px' }}>
                <img src={doctorLogo} className='ConsultationSchedule-DoctorAvatar' />
                <div className='ConsultationSchedule-PatientInfoBlock'>
                    <div className='ConsultationSchedule-PatientInfo'>
                        <StyledTitle fontSize='18px'> {this.props.patient.patientName} </StyledTitle>
                        <StyledContent fontSize='18px'> {this.props.patient.appointmentTime} </StyledContent>
                        <div class = 'Overview-NextPatientAttributes'>
                            <StyledTitle fontSize='16px'> Visit Status: </StyledTitle>
                            <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {this.props.patient.visitStatus} </StyledContent>
                        </div>
                        <div class = 'Overview-NextPatientAttributes'>
                            <StyledTitle fontSize='16px'> Details: </StyledTitle>
                            <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {this.props.patient.patientDetails} </StyledContent>
                        </div>
                        <div class = 'Overview-NextPatientAttributes'>
                            <StyledTitle fontSize='16px'>  Last Appt: </StyledTitle>
                            <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {this.props.patient.lastAppt} </StyledContent>
                        </div>
                    </div>
                    {this.toggleStartSessionButton(this.props.toggleStartSessionButton)}
                </div>
            </Card>
        )
    }
}

export default PatientInfoBlock;