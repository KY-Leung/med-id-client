import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Patient.css';

import { Link } from 'react-router-dom'
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';
import Button from '@material-ui/core/Button';
import Textarea from "react-textarea-autosize";

class DiagnosisFormContainer extends Component {
    
    state = {
        diagnosis: "",
        prescription: [],
        referralNotes: ""
    };

    render() {
        return (
            <div className='Patient-DiagnosisFormContainer'>
                <StyledTitle fontSize='18px'> Diagnosis </StyledTitle>
                <Textarea minRows={10} defaultValue={this.props.newConsultation.diagnosis} onChange={e => this.setState({diagnosis: e.target.value})} style={{margin: '30px 0px'}}/>
                <StyledTitle fontSize='18px'> Prescription (new line for each prescription)</StyledTitle>
                <Textarea minRows={10} defaultValue={this.props.newConsultation.prescription} onChange={e => this.setState({prescription: e.target.value.split(/\r?\n/)})} style={{margin: '30px 0px'}}/>
                <StyledTitle fontSize='18px'> Referral Notes </StyledTitle>
                <Textarea minRows={10} defaultValue={this.props.newConsultation.referralNotes} onChange={e => this.setState({referralNotes: e.target.value})} style={{margin: '30px 0px'}}/>
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