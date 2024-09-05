import React from 'react';
import './Button.css';

interface ButtonProps {
    lable: string;
    onClick: () => void;
}
const ButtonComponent = ({lable, onClick}: ButtonProps) => {

    return (
        <>
            <button onClick={onClick}>
                {lable}
            </button>
        </>
    )
}

export default ButtonComponent;