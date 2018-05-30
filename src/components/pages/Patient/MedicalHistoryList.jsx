import React, {Component} from 'react';

import './Patient.css';
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export const ListItemSecondaryField = (doctor, dateTime) => {
    return (
        <div className='ListItemSecondaryField'>
            <div>{doctor}</div>
            <div>{dateTime}</div>
        </div>
    )
}

export const MedicalHistoryList = (props) => {
    return (
        <div className='MedicalHistoryList'>
            <List component="nav">
                { props.patientMedicalHistory.map((block, index) => {
                    return (
                        <div key={index} onClick={() => props.onListItemClick(block)}>
                            <ListItem button>
                                <ListItemText
                                    primary={block.visitType}
                                    secondary={ListItemSecondaryField(block.referee, block.dateTime)} />
                            </ListItem>
                            <Divider />
                        </div>
                    )
                })}
            </List>
        </div>
    )
}

export const MedicalHistoryDetail = (props) => {
    let selected = props.selectedMedicalHistoryBlock;

    return (
        <div className='MedicalHistoryDetail'>
            <StyledTitle fontSize='25px' style={{margin: '30px'}}> {selected.visitType} </StyledTitle>
            <ItemBlock title='Referee' content={selected.referee}></ItemBlock>
            <ItemBlock title='Date & Time' content={selected.dateTime}></ItemBlock>
            <ItemBlock title='Chief Complaint' content={selected.chiefComplaint}></ItemBlock>
            <ItemBlock title='Diagnosis' content={selected.diagnosis}></ItemBlock>
            <ItemsBlock title='Prescription' items={selected.prescription}></ItemsBlock>
            { selected.referralNotes &&
                <ItemBlock title='Referral Notes' content={selected.referralNotes}></ItemBlock>
            }
        </div>
    )
}

export const ItemsBlock = (props) => {
    return (
        <div style={{ margin: '20px 30px'}}>
            <StyledTitle fontSize='18px'> {props.title} </StyledTitle>
            { props.items && props.items.map((item, index) => {
                return <StyledContent fontSize='18px' style={{}}> {item} </StyledContent>
            })}
        </div>
    )
}

export const ItemBlock = (props) => {
    return (
        <div style={{ margin: '20px 30px'}}>
            <StyledTitle fontSize='18px'> {props.title} </StyledTitle>
            <StyledContent fontSize='18px' style={{}}> {props.content} </StyledContent>
        </div>
    )
}