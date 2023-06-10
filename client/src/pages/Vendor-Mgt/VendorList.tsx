import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow, Col, Loader } from '../../components';
import { ListTitle } from './LaborList';


export const ListTextLeft = styled.p`
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


interface Props {
    vendors: {
        vendors: Array<any>,
        loading: boolean,
    }
}

export const VendorList = (props: Props) => {
    const { vendors, loading } = props.vendors;

    return (
        <div>
            <ListTitle><h3>Vendor/Supplier List</h3></ListTitle>
            <div style={{height: '80vh', overflowY: 'auto', paddingBottom: '25px', paddingRight: '5px'}}>
                {
                    !loading && vendors.map((vendor: any) => {
                        return (
                            <div key={vendor._id} style={{padding: '12px 0', borderBottom: '1px solid #e5e6e6'}}>
                                <FlexRow>
                                    <Col width="46"><ListTextLeft>{vendor.name}</ListTextLeft></Col>
                                    <Col width="32"><ListTextLeft>{vendor.address}</ListTextLeft></Col>
                                    <Col width="20"><ListTextRight>{vendor.contact}</ListTextRight></Col>
                                </FlexRow>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    )
}

export default VendorList;