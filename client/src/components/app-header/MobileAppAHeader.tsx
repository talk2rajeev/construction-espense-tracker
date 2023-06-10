import React, { ReactNode } from 'react';
import styled from 'styled-components';

const AppSectionHeader = styled.div`
    background: #215f69;
    padding: 21px 20px;
    @media only screen and (max-width: 768px) {
        padding: 15px 10px;
        background: #0e4641;
    }
`;

interface Props {
    children?: ReactNode;
}


export const MobileAppAHeader = (props: Props) => {
    return (
        <div>
            <AppSectionHeader>
                {props.children}
            </AppSectionHeader>
        </div>
    )
}

export default MobileAppAHeader;