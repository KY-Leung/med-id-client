import React from 'react';

export const formatTime = (date) => {
    date = new Date(date);
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
    minutes = minutes < 10 ? '0'+minutes : minutes; // minute formatting
    hours = hours < 10 ? '0'+hours : hours; // hours formatting

    return [hours, minutes].join(':');
}