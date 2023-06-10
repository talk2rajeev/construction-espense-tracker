import React from 'react';
import styled from 'styled-components';
import { FlexRow, Col, Loader } from '../../components';

const ListTextLeft = styled.p`
    font-size: 13.5px;
    color: #1c2a28;
`;
const ListTextRight = styled.p`
    font-size: 12px;
    color: #1c2a28;
    text-align: right;
    span{
        display: inline-block;
        padding: 3px 10px;
        border-radius: 10px;
        font-weight: 500;
    }
    .vendor{
        background: green;
        color: #fff;
    }
    .labor{
        background: #FF9800;
        color: #fcfbfa;
    }
`;

export const ListTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #476360;
    padding-bottom: 12px;
    margin-top: 20px;
    border-bottom: 1px solid #435a58;
    h3 {
        font-size: 16px;
        font-weight: 500;
        color: #435a58;
    }
`;
interface Props {
    labors: {
        labors: Array<any>,
        loading: boolean,
    }
}

export const LaborList = (props: Props) => {

    const { labors, loading } = props.labors;

    return (
        <div>
            <ListTitle><h3>Labor/Contractor List</h3></ListTitle>
            <div style={{height: '80vh', overflowY: 'auto', paddingBottom: '25px', paddingRight: '5px'}}>
                {
                    !loading && labors.map((labor: any) => {
                        return (
                            <div key={labor._id} style={{padding: '12px 0', borderBottom: '1px solid #e5e6e6'}}>
                                <FlexRow>
                                    <Col width="46"><ListTextLeft>{labor.name}</ListTextLeft></Col>
                                    <Col width="32"><ListTextLeft>{labor.address}</ListTextLeft></Col>
                                    <Col width="20"><ListTextRight>{labor.contact}</ListTextRight></Col>
                                </FlexRow>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LaborList;
