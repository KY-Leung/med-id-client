import React from 'react';

import './Patient.css';

import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

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