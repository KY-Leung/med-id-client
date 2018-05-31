import React from 'react';


export const getAvatarMapping = (value) => {
    let avatarInfo = {};

    switch(value){
        case '1':
            avatarInfo = {'name': 'Dr. John House', 'title': 'Resident General Practitioner'};
            break;
        case '2':
            avatarInfo = {'name': 'Dr. Alicia Banks', 'title': 'Resident ENT Specialist'};
            break;
        default:
            avatarInfo = {};
            break;
    }

    return avatarInfo;
};