import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import './Patient.css';
import { InfoBlock, AppointmentBlock, ChiefComplaintBlock, DiagnosisBlock } from './Blocks';
import { MedicalHistoryList, MedicalHistoryDetail } from './MedicalHistoryList';
import DiagnosisFormContainer from './DiagnosisFormContainer';

//REDUX
import { connect } from 'react-redux';
import { getPatientMedicalRecord } from '../../../actions/getPatientMedicalRecord';
import { postPatientMedicalRecord } from '../../../actions/postPatientMedicalRecord';

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
        selectedMedicalHistoryBlock: {},
        newConsultation: {
            diagnosis: "Final Diagnosis : 21 years old, female, complains of stuffy nose and blocked ear since 7th May of 2018. Has made 2 visits to other healthcare facilities regarding this condition prior to today's consultation. Conditions and symptoms have not resided. - Discharge from the left ear, hearing loss - Diminished hearing with slight vertigo, oral decongestion did not help after 2.5weeks - Nasal obstruction (unilateral), treated with Zyrtec but to no avail, dosage to be increased for treatment - Nasal discharge sometimes bloody, inflammation still present, new course of antibiotics administered - Refer to otolaryngologist for further check-up.",
            prescription: ["Zyrtec, 10mg. 2 times/day", "Dalacin® C, 180mg. 2 Cap/day"],
            referralNotes: "Referral to : Specialist Consulting Clinics, The Pastorine Hospital Reason for patient referral : Persistent epistaxis, blocked ear since 7th May 2018, discharge from the left ear, hearing loss. Diminished hearing with slight vertigo. Nasal obstruction (unilateral). Frontal sinusitis with persistent frontal headache). Mitigation measures include extension of antibiotics course and double Zyrtec dosage. Flagged for urgent attention. To be discussed with ENT Registrar on call to obtain appropriate prioritisation and a referral letter faxed to department."
        },
        startDiagnosis: false,
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
                'content': this.getCurrentDateTime()
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

    onListItemClick = (selectedMedicalHistoryBlock) => {
        this.setState({ selectedMedicalHistoryBlock });
    }

    onStartDiagnosisClick = () => {
        this.setState({ startDiagnosis: true });
    }

    onSaveDiagnosis = (newConsultation) => {
        this.setState({
            newConsultation: {
                diagnosis: newConsultation.diagnosis,
                prescription: newConsultation.prescription,
                referralNotes: newConsultation.referralNotes
            },
            startDiagnosis: false
        });
    }

    onEndSession = () => {
        let restore = "{\"name\":\"Cecilia Rosewood\",\"phone\":\"Tel : +1 650 123 4321\",\"lastAppt\":\"--\",\"age\":\"21 Years Old, Jan 23, 1997\",\"gender\":\"Female\",\"height\":\"158cm\",\"weight\":\"52.3 kg\",\"currentMedications\":[],\"allergies\":[\"Penicillin\",\"Nut\"],\"familyHistory\":[\"DM (Diabetes Mellitus)\"],\"medicalConditions\":[\"Childhood Asthma\",\"G6PD Deficiency\",\"Chronic Rhinitis\"],\"medicalHistory\":[{\"visitType\":\"GP Visit\",\"referee\":\"Dr Shawn Livingstone, Healthplus Care Urgent Care\",\"dateTime\":\"05/12/2018, 12:19\",\"practiceAddress\":\"321 South Beare Avenue, CA 93201\",\"chiefComplaint\":\"This is the 2nd visit for this 21 year old woman with a history of chronic rhinitis who presented with the chief complaint of having flu symptoms; stuffy nose, blocked ear and fever.\",\"diagnosis\":\"Final Diagnosis : Infection and Inflammation of the paranasal sinuses. Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Inflammation and Infection to be treated with Clindamycin, Dalacin® C Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Dalacin® C, 180mg. 2 Cap/day\",\"Advil, 200mg. 2Cap/2 times/day\"]},{\"visitType\":\"GP Visit\",\"referee\":\"Dr Shawn Livingstone, Healthplus Care Urgent Care\",\"dateTime\":\"05/07/2018, 15:12\",\"practiceAddress\":\"321 South Beare Avenue, CA 93201\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]},{\"visitType\":\"Prescription\",\"referee\":\"Dr Hubert Chan, Hillsboro Clinic\",\"dateTime\":\"03/11/2018, 10:12\",\"practiceAddress\":\"321 Hillsboro Avenue, CA 94321\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]},{\"visitType\":\"Prescription\",\"referee\":\"Dr Hubert Chan, Hillsboro Clinic\",\"dateTime\":\"02/11/2018, 10:12\",\"practiceAddress\":\"321 Hillsboro Avenue, CA 94321\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]},{\"visitType\":\"GP Visit\",\"referee\":\"Dr Fog Logic, Logical Health Care\",\"dateTime\":\"01/07/2017, 10:12\",\"practiceAddress\":\"321 Logic Avenue, CA 93201\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]},{\"visitType\":\"Prescription\",\"referee\":\"Dr Fog Logic, Logical Health Care\",\"dateTime\":\"01/06/2017, 10:12\",\"practiceAddress\":\"321 Logic Avenue, CA 93201\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]},{\"visitType\":\"Prescription\",\"referee\":\"Dr Fog Logic, Logical Health Care\",\"dateTime\":\"01/02/2016, 10:12\",\"practiceAddress\":\"321 Logic Avenue, CA 93201\",\"chiefComplaint\":\"21 year old woman with a history of chronic rhinitis, presented with flu symptoms; stuffy nose, fever.\",\"diagnosis\":\"Final Diagnosis : Common cold Nasal obstruction (unilateral) to be treated with Cetirizine, Zyrtec Fever and flu to be treated with Ibuprofen, Advil\",\"prescription\":[\"Zyrtec, 10mg. 1 times/day\",\"Advil, 200mg, 2Cap/2 times/day\"]}]}"
        let now = this.getCurrentDateTime();

        let consultationDetails = {
            "visitType": "GP Visit",
            "referee": "Dr John House",
            "dateTime": now,
            "practiceAddress": "The Pastorine Hospital",
            "chiefComplaint": "Flu / Cold Symptoms and Fever for a prolonged period ( >7 days )",
            ...this.state.newConsultation
        }
        
        this.props.patientMedicalRecord.medicalHistory.unshift(consultationDetails);
        let stringifyRecord = JSON.stringify(this.props.patientMedicalRecord);
        this.props.postPatientMedicalRecord(stringifyRecord);

        this.setState({
            newConsultation: {
                diagnosis: "",
                prescription: [],
                referralNotes: ""
            },
        });
    }

    getCurrentDateTime () {
        let today = new Date();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        if (hour < 10) {
            hour = '0'+ hour
        } 

        if (minute < 10) {
            minute = '0'+ minute
        } 

        if (date < 10) {
            date = '0'+ date
        } 

        if (month < 10) {
            month = '0'+ month
        } 

        let now = month + '/' + date + '/' + year + ', ' + hour + ':' + minute;
        return now;
    }

    render() {
        const { classes } = this.props;
        const { selectedMedicalHistoryBlock, newConsultation, startDiagnosis, value } = this.state;

        let patientMedicalRecord = this.props.patientMedicalRecord;
        let patientMedicalInfoBlocks = this.generatePatientMedicalInfoBlocksList(patientMedicalRecord);
        let patientAppointmentBlocks = this.generatePatientAppointmentBlocksList();
        let patientChiefComplaintList = this.generatePatientChiefComplaintList();

        const renderContent = startDiagnosis ? (
            <DiagnosisFormContainer newConsultation={this.state.newConsultation} onSaveDiagnosis={this.onSaveDiagnosis}/>
        ) : (
            <div className='Patient-MedicalHistoryContainer'>
                <div className='Patient-MedicalHistoryListBlock'>
                    <StyledTitle fontSize='18px' style={{padding: '30px'}}> Medical History </StyledTitle>
                    <MedicalHistoryList patientMedicalHistory={patientMedicalRecord.medicalHistory} onListItemClick={this.onListItemClick}/>
                </div>
                <div className='Patient-MedicalHistoryDetail'>
                    { selectedMedicalHistoryBlock.visitType &&
                        <MedicalHistoryDetail selectedMedicalHistoryBlock={selectedMedicalHistoryBlock } />
                    }
                </div>
            </div>    
        );

        return (
            <div>
                <div className='Patient-InfoContainer'>
                    <img src={doctorLogo} className='Patient-PatientAvatar' />
                    { patientMedicalInfoBlocks.map((block, index) => {
                        return <InfoBlock title={block.title} items={block.items}/>
                    })}
                </div>
                <div className='Patient-MedicalRecordsContainer'>
                    <div className='Patient-ToggleButtons'>
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
                        <Button className='Patient-EndSessionButton' variant="raised" color="secondary" onClick={() => this.onEndSession()}>
                            End Session
                        </Button>
                    </div>
                    {value === 0 &&
                        <div className='Patient-ConsultationContainer'> 
                            <div className='Patient-AppointmentContainer'>
                                { patientAppointmentBlocks.map((block, index) => {
                                    return <AppointmentBlock title={block.title} content={block.content}/>
                                })}
                            </div>
                            <div className='Patient-MedicalInfoContainer'>
                                <div className='Patient-SessionContainer'>
                                    <div className='Patient-ChiefComplaintBlock'>
                                        <StyledTitle fontSize='18px' style={{marginBottom: '50px'}}> Today's Chief Complaint </StyledTitle>
                                        <div class = 'ChiefComplaintBlock'>
                                            <StyledTitle fontSize='16px'> CC: </StyledTitle>
                                            <StyledContent fontSize='16px' style={{marginLeft: '5px', marginBottom: '12px'}}> Flu / Cold Symptoms and Fever for a prolonged period ( >7 days ) </StyledContent>
                                        </div>
                                        { patientChiefComplaintList.map((block, index) => {
                                            return <ChiefComplaintBlock title={block.title} content={block.content}/>
                                        })}
                                    </div>
                                    <DiagnosisBlock newConsultation={newConsultation} onStartDiagnosisClick={this.onStartDiagnosisClick}/>
                                </div>
                                {renderContent}
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
        getPatientMedicalRecord,
        postPatientMedicalRecord
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Patient);

// export default withStyles(styles)(Patient);