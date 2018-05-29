import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import './Patient.css';
import  { InfoBlock, AppointmentBlock, ChiefComplaintBlock } from './Blocks';

//REDUX
import { connect } from 'react-redux';
import { getPatientMedicalRecord } from '../../../actions/getPatientMedicalRecord';

import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';
import doctorLogo from '../../../assets/images/person1.jpg';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabContainer(props) {
    return (
    <Typography component="div" style={{ height: '100%', padding: 8 * 3 }}>
        {props.children}
    </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    },
});

class Patient extends Component {

    state = {
        value: 0,
    };

    generatePatientMedicalInfoBlocksList (patientMedicalRecord) {
        const patientMedicalInfoBlocks = [
            {
                'title': patientMedicalRecord.name,
                'items': [patientMedicalRecord.phone, 'Last Appt: ' + patientMedicalRecord.lastAppt]
            }, {
                'title': 'Info',
                'items': [patientMedicalRecord.age, patientMedicalRecord.gender, patientMedicalRecord.height, patientMedicalRecord.weight]
            }, {
                'title': 'Current Medications',
                'items': [patientMedicalRecord.currentMedications]
            }, {
                'title': 'Allergies',
                'items': patientMedicalRecord.allergies
            }, {
                'title': 'Family History',
                'items': patientMedicalRecord.familyHistory
            }, {
                'title': 'Medical Conditions',
                'items': patientMedicalRecord.medicalConditions
            }
        ];
        return patientMedicalInfoBlocks;
    }

    generatePatientAppointmentBlocksList () {
        const patientMedicalInfoBlocks = [
            {
                'title': 'Appointment Date',
                'content': 'May 19th 08:00'
            }, {
                'title': 'Appointment Type',
                'content': 'New Patient, Walk-in'
            }
        ];
        return patientMedicalInfoBlocks;
    }

    generatePatientChiefComplaintList () {
        const patientChiefComplaintList = [
            {
                'title': 'Body Temperature : ',
                'content': '37.5 °C'
            }, {
                'title': 'Heart Rate : ',
                'content': '88 BPM'
            }, {
                'title': 'Blood Pressure : ',
                'content': '118 / 72'
            }, {
                'title': 'Breathing Rate : ',
                'content': '16'
            }
        ];
        return patientChiefComplaintList;
    }

    componentWillMount() {
        this.props.getPatientMedicalRecord();
    }
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        let patientMedicalInfoBlocks = this.generatePatientMedicalInfoBlocksList(this.props.patientMedicalRecord);
        let patientAppointmentBlocks = this.generatePatientAppointmentBlocksList();
        let patientChiefComplaintList = this.generatePatientChiefComplaintList();

        return (
            <div>
                <div className='Patient-InfoContainer'>
                    <img src={doctorLogo} className='Patient-PatientAvatar' />
                    { patientMedicalInfoBlocks.map((block, index) => {
                        return <InfoBlock title={block.title} items={block.items}/>
                    })}
                </div>
                <div className='Patient-MedicalRecordsContainer'>
                    <AppBar  className='Patient-AppBar' position="static">
                    <Tabs value={value} onChange={this.handleChange} className="Patient-AppBarTab">
                        <Tab label="Today's Consultation" />
                        <Tab label="Sugeries / Procedures" />
                        <Tab label="Clinical Notes" />
                        <Tab label="Medication List" />
                        <Tab label="Vaccination" />
                        <Tab label="Insurance" />
                    </Tabs>
                    </AppBar>
                    {value === 0 &&
                        <div> 
                            <div className='Patient-AppointmentContainer'>
                                { patientAppointmentBlocks.map((block, index) => {
                                    return <AppointmentBlock title={block.title} content={block.content}/>
                                })}
                            </div>
                            <div className='Patient-sessionContainer'>
                                <div className='Patient-chiefComplaintBlock'>
                                    <StyledTitle fontSize='25px' style={{marginBottom: '50px'}}> Today's Chief Complaint </StyledTitle>
                                    <div class = 'ChiefComplaintBlock'>
                                        <StyledTitle fontSize='16px'> CC: </StyledTitle>
                                        <StyledContent fontSize='16px' style={{marginLeft: '5px', marginBottom: '12px'}}> Flu / Cold Symptoms and Fever for a prolonged period ( >7 days ) </StyledContent>
                                    </div>
                                    { patientChiefComplaintList.map((block, index) => {
                                        return <ChiefComplaintBlock title={block.title} content={block.content}/>
                                    })}
                                </div>
                                <div className='Patient-diagnosisBlock'>
                                    
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    } 
}

Patient.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        patientMedicalRecord: state.patientMedicalRecord.patientMedicalRecord
    }
}

const mapDispatchToProps = () => {
    return {
        getPatientMedicalRecord
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Patient);

// export default withStyles(styles)(Patient);