import React from 'react';

import './StyledText.css';

export const StyledTitle = (props) => {
    return (
        <div className='StyledText StyledText-Title' style={{fontSize: props.fontSize, ...props.style }}>
            {props.children}
        </div>
    )
}

export const StyledContent = (props) => {
    return (
        <div className='StyledText StyledText-Content' style={{fontSize: props.fontSize, ...props.style }}>
            {props.children}
        </div>
    )
}