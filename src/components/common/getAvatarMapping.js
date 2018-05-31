import React from 'react';

export const getAvatarMapping = (value) => {
    let avatarInfo = {};

    switch(value){
        case '1':
            avatarInfo = {'name': 'Dr. John House', 'title': 'Dr. John House'};
            break;
        case '2':
            avatarInfo = {'name': 'Dr. Alicia Banks', 'title': 'Dr. Alicia Banks'};
            break;
        default:
            avatarInfo = {};
            break;
    }

    return avatarInfo;
};