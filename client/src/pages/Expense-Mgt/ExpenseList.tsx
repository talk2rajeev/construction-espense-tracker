import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow, MobileFlexRow, Col, InputText, Loader } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../../redux/reducers/expense/actions';
import { getExpenseTotal } from '../../helpers/helper';
import expand from '../../components/expand.png';


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


interface Props {
    
}

export const ExpenseList = (props: Props) => {

    const dispatch = useDispatch();
    const {expenseList, loading} = useSelector((state: any) => state.expenses);

    useEffect(() => {
        //dispatch(fetchExpenses());
        if (expenseList.length === 0) {
            dispatch(fetchExpenses());
        }
    }, []);

    return (
        <div>
            <div>
                <div style={{borderBottom: '1px solid #e5e6e6', padding: '10px 0'}}>
                    <FlexRow>
                        <Col width="70"><span style={{fontSize: 18, fontWeight: 700}}>Paid To</span></Col>
                        <Col width="30"><ListTextRight style={{background: 'none', fontSize: 20}}>&#8377; {getExpenseTotal(expenseList)}</ListTextRight></Col>
                    </FlexRow>
                </div>

                <div style={{height: '80vh', overflowY: 'auto', paddingBottom: '25px', paddingRight: '5px'}}>
                    
                    {
                        expenseList.map((item: any, i: number) => {
                            return (
                                <div key={item._id} style={{padding: '12px 0', borderBottom: '1px solid #e5e6e6'}}>
                                    <FlexRow>
                                        <Col width="46"><ListTextLeft>{item.vendor_name}</ListTextLeft></Col>
                                        <Col width="32"><ListTextLeft>{item.exp_name}</ListTextLeft></Col>
                                        <Col width="20"><ListTextRight><span className={item.exp_type === 'Labor' ? 'labor' : 'vendor'}>&#8377; {item.exp_amount}</span></ListTextRight></Col>
                                    </FlexRow>
                                </div>
                            )
                        })
                    }
                </div>
                
                
            </div>
        </div>
    )
}

export default ExpenseList;
