import React, {Component} from 'react';

import './ConsultationSchedule.css';

import { Link } from 'react-router-dom'

import { Card } from '../../common/Card/Card';
import { formatTime } from '../../common/formatTime';
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

import doctorLogo from '../../../assets/images/person1.jpg';
import Button from '@material-ui/core/Button';

import benjaminLogo from '../../../assets/portrait/Benjamin.jpg';
import brandonLogo from '../../../assets/portrait/Brandon.jpg';
import ceciliaLogo from '../../../assets/portrait/cecilia.jpg';
import chelseaLogo from '../../../assets/portrait/Chelsea.jpg';
import jackyLogo from '../../../assets/portrait/Jacky.jpg';
import jamesLogo from '../../../assets/portrait/James.jpg';
import johnLogo from '../../../assets/portrait/John.jpg';
import nathanLogo from '../../../assets/portrait/Nathan.jpg';
import oliverLogo from '../../../assets/portrait/Oliver.jpg';
import oscarLogo from '../../../assets/portrait/Oscar.jpg';
import sarahLogo from '../../../assets/portrait/Sarah.jpg';
import Avatar from '@material-ui/core/Avatar';


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
                {this.props.patient.patientName == 'Benjamin' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={benjaminLogo}/>
                }
                {this.props.patient.patientName == 'Brandon' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={brandonLogo}/>
                }
                {this.props.patient.patientName == 'Cecilia' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={ceciliaLogo}/>
                }
                {this.props.patient.patientName == 'Katie' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={chelseaLogo}/>
                }
                {this.props.patient.patientName == 'Jacky' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={jackyLogo}/>
                }

                {this.props.patient.patientName == 'James' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={jamesLogo}/>
                }
                {this.props.patient.patientName == 'John' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={johnLogo}/>
                }
                {this.props.patient.patientName == 'Jonathan' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={nathanLogo}/>
                }
                {this.props.patient.patientName == 'Marcus' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={jamesLogo}/>
                }
                {this.props.patient.patientName == 'Oliver' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={oliverLogo}/>
                }
                {this.props.patient.patientName == 'Hubert' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={oscarLogo}/>
                }

                {this.props.patient.patientName == 'Jake' &&
                    <Avatar className='ConsultationSchedule-PatientAvatar' src={sarahLogo}/>
                }
                {/* <img src={doctorLogo} className='ConsultationSchedule-PatientAvatar' /> */}
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