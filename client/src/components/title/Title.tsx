import React from 'react';
import styled from 'styled-components';

const HeadingWrapper = styled.div`
    h3{
        font-size: 16px;
        font-weight: bold;
        color: #444;
        margin-bottom: 15px;
    }
`;

const SubHeadingWrapper = styled.div`
    h3{
        font-size: 14px;
        font-weight: bold;
        color: #333;
    }
`;

const FormLabelWrapper = styled.div`
    h4{
        font-size: 14px;
        font-weight: 400;
        color: #333;
        margin-bottom: 10px;
    }
`;

interface Props {
    title: string;
}

export const Heading = (props: Props) => {
    return (
        <HeadingWrapper>
            <h3>{props.title}</h3>
        </HeadingWrapper>
    )
}

export const SubHeading = (props: Props) => {
    return (
        <SubHeadingWrapper>
            <h3>{props.title}</h3>
        </SubHeadingWrapper>
    )
}


export const FormLabel = (props: Props) => {
    return (
        <FormLabelWrapper>
            <h4>{props.title}</h4>
        </FormLabelWrapper>
    )
}


