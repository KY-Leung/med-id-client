import React from 'react';

import './Patient.css';

import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

import Button from '@material-ui/core/Button';

export const InfoBlock = (props) => {
    return (
        <div className='InfoBlock'>
            <StyledTitle fontSize='25px'> {props.title} </StyledTitle>
            { props.items.map((item, index) => {
                return <StyledContent fontSize='18px' style={{margin: '8px 0px'}}> {item} </StyledContent>
            })}
        </div>
    )
}

export const AppointmentBlock = (props) => {
    return (
        <div className='AppointmentBlock'>
            <StyledTitle fontSize='18px'> {props.title} </StyledTitle>
            <StyledContent fontSize='18px' style={{ marginTop: '9px' }}> {props.content} </StyledContent>
        </div>
    )
}

export const ChiefComplaintBlock = (props) => {
    return (
        <div class = 'ChiefComplaintBlock'>
            <StyledTitle fontSize='16px'> {props.title} </StyledTitle>
            <StyledContent fontSize='16px' style={{marginLeft: '5px'}}> {props.content} </StyledContent>
        </div>
    )
}

export const DiagnosisBlock = (props) => {
    let { newConsultation, onStartDiagnosisClick } = props;

    return (
        <div className='Blocks-DiagnosisBlock'>
            <div className='Blocks-DiagnosisSnapshot'>
                <div>
                    <StyledTitle fontSize='18px'> Diagnosis </StyledTitle>
                    <StyledContent fontSize='18px' style={{marginTop: '8px'}}> {newConsultation.diagnosis} </StyledContent>
                </div>
                <div style={{marginTop: '60px'}}>
                    <StyledTitle fontSize='18px'> Prescription </StyledTitle>
                    <StyledContent fontSize='18px' style={{marginTop: '8px'}}> {newConsultation.prescription} </StyledContent>
                </div>
                <div style={{marginTop: '60px'}}>
                    <StyledTitle fontSize='18px'> Referral Notes </StyledTitle>
                    <StyledContent fontSize='18px' style={{marginTop: '8px'}}> {newConsultation.referralNotes} </StyledContent>
                </div>
            </div>
            <Button className='Blocks-AddDiagnosisButton' variant="raised" color="primary" onClick={() => onStartDiagnosisClick()}>
                <div className='Blocks-AddIcon'> + </div>
            </Button>
        </div> 
    )
}