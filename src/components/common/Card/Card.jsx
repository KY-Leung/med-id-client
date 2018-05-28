import React from 'react';

import './Card.css';

export const Card = (props) => {
    return (
        <div className='Card' style={props.style}>
            {props.children}
        </div>
    )
}