import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    @media only screen and (max-width: 768px) {
        .mobile-btn {
            width: 100%;
        }
    }
`;

interface Props {
    title: string;
    onClick: () => void;
    color: string;
}

export const Button = (props: Props) => {
    let classname = props.color === 'primary' ? 'btn-primary' : 'btn-default';
    return (
        <ButtonWrapper>
            <button className={`mobile-btn btn ${classname}`} onClick={props.onClick}>{props.title}</button>
        </ButtonWrapper>
    )
}

export default Button;
