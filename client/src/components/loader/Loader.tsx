import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Spin = () => {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="css-bleycz">
            <g name="icon-workflows-running" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <circle name="Oval" fill="#17a2b8" cx="12" cy="12" r="10"></circle>
                <path d="M22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12" name="Shape" fill="#f5f5f5">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="2s" repeatCount="indefinite"></animateTransform>
                </path>
                <path d="M22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12" name="Shape" fill="#ffffff">
                    <animateTransform attributeName="transform" type="rotate" from="180 12 12" to="540 12 12" dur="4s" repeatCount="indefinite"></animateTransform>
                </path>
            </g>
        </svg>
    )
}

const WaitWrapper = styled.div`
    position: relative;
`;

const Backdrop = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const WaitMsgBox = styled.div`
    position: fixed;
    width: 450px;
    margin: 185px auto;
    left: 50%;
    color: rgb(255, 255, 255);
    text-align: center;
    z-index: 1001;
    margin-left: -225px;
`;

const Title = styled.h2`
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
    color: #fff;
    margin: 10px 0 0;
    padding: 0;
    text-align: center;
`;
export const Message = styled.h4`
    font-size: 16px;
    line-height: 26px;
    font-weight: lighter;
    color: #fff;
    margin: 0;
    padding: 0;
    text-align: center;
`;

interface Props {
    children?: ReactNode | undefined;
    title: string;
    message: string;
}

export default class Loader extends React.Component<Props, {}> {
    render() {
        const { children, title, message } = this.props;
        return (
            <WaitWrapper>
                <Backdrop />
                <WaitMsgBox>
                    <div style={{textAlign: 'center'}}>
                        <div style={{display: 'inline-block', width: 45}}>
                            <Spin />
                        </div>
                    </div>
                    <Title>{title}</Title>
                    <Message>{message}</Message>
                    {children}
                </WaitMsgBox>
            </WaitWrapper>
        );
    }
}
