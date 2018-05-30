import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Patient.css';

import { Link } from 'react-router-dom'
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';
import Button from '@material-ui/core/Button';
import Textarea from "react-textarea-autosize";

class DiagnosisFormContainer extends Component {
    
    state = {
        diagnosis: "Final Diagnosis : 21 years old, female, complains of stuffy nose and blocked ear since 7th May of 2018. Has made 2 visits to other healthcare facilities regarding this condition prior to today's consultation. Conditions and symptoms have not resided. - Discharge from the left ear, hearing loss - Diminished hearing with slight vertigo, oral decongestion did not help after 2.5weeks - Nasal obstruction (unilateral), treated with Zyrtec but to no avail, dosage to be increased for treatment - Nasal discharge sometimes bloody, inflammation still present, new course of antibiotics administered - Refer to otolaryngologist for further check-up.",
        prescription: ["Zyrtec, 10mg. 2 times/day", "Dalacin® C, 180mg. 2 Cap/day"],
        referralNotes: "Referral to : Same hospital (G Canyon, ENT department) : Persistent epistaxis, blocked ear since 7th May 2018, discharge from the left ear, hearing loss. Diminished hearing with slight vertigo. Nasal obstruction (unilateral). Frontal sinusitis with persistent frontal headache). Mitigation measures include extension of antibiotics course and double Zyrtec dosage. Flagged for urgent attention. To be discussed with ENT Registrar on call to obtain appropriate prioritisation and a referral letter faxed to department."
    };

    componentWillMount() {
        let { diagnosis, prescription, referralNotes } = this.props.newConsultation;

        if (diagnosis !== "" && prescription !== [] && !referralNotes !== "" ) {
            this.setState({
                diagnosis: diagnosis,
                prescription:  prescription,
                referralNotes: referralNotes
            });
        }
    }

    render() {
        let prescriptionInNewLines = this.state.prescription.join('\n');

        return (
            <div className='Patient-DiagnosisFormContainer'>
                <StyledTitle fontSize='18px'> Diagnosis </StyledTitle>
                <Textarea minRows={10} defaultValue={this.state.diagnosis} onChange={e => this.setState({diagnosis: e.target.value})} style={{margin: '30px 0px'}}/>
                <StyledTitle fontSize='18px'> Prescription (new line for each prescription)</StyledTitle>
                <Textarea minRows={10} defaultValue={prescriptionInNewLines} onChange={e => this.setState({prescription: e.target.value.split(/\r?\n/)})} style={{margin: '30px 0px'}}/>
                <StyledTitle fontSize='18px'> Referral Notes </StyledTitle>
                <Textarea minRows={10} defaultValue={this.state.referralNotes} onChange={e => this.setState({referralNotes: e.target.value})} style={{margin: '30px 0px'}}/>
                <Link to='/patient'>
                    <Button variant="raised" color="primary" onClick={() => this.props.onSaveDiagnosis(this.state)}>
                        Save & Return 
                    </Button>
                </Link>    
            </div>
        )
    }
}

export default DiagnosisFormContainer;