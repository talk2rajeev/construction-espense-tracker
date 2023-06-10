import React, { ReactNode } from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const MobileFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const ColWrap = styled.div`
    position: relative;
    @media only screen and (max-width: 768px) {
        display: block;
        width: 100%;
    }
`;


const Col = (props: {children: ReactNode, col?: number, width?: string}) => {
    if(props.col) return <ColWrap style={{flex: props.col}}>
        <React.Fragment>
            {props.children}
        </React.Fragment>
    </ColWrap>;
    else if(props.width) return <ColWrap style={{width: props.width+'%'}}>
        <React.Fragment>
            {props.children}
        </React.Fragment>
    </ColWrap>;
    else return <ColWrap>
        <React.Fragment>
            {props.children}
        </React.Fragment>
    </ColWrap>;
}

export {
    FlexRow,
    MobileFlexRow,
    Col
}
