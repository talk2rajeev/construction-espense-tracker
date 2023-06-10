import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../../redux/reducers/expense/actions';
import BarChart from '../../components/graphs/BarChart';
import PieChart from '../../components/graphs/PieChart';

const Stats = styled.div`
    border: 1px solid #efefef;
    background: #f5f5f5;
    padding: 10px;
    margin: 25px 0;
    .stats-row {
        margin-bottom: 20px;
        clear: both;
    }
    .stats-label {
        font-size: 14px;
        color: #555;
        float: left;
    }
    .stats-value {
        font-size: 14px;
        font-weight: bold;
        color: #333;
        float: right;
    }

`;

interface Props {
    
}

const Visualize = (props: Props) => {

    const dispatch = useDispatch();
    const {expenseList, loading} = useSelector((state: any) => state.expenses);

    const groupedExpenses = expenseList.reduce((acc: any, cur: any)=> {
        if(cur['exp_type'] === 'Labor'){
            acc['Labor'] = acc['Labor'] + cur.exp_amount;
        } 
        if(cur['exp_type'] === 'Material'){
            acc['Material'] = acc['Material'] + cur.exp_amount;
        }
        if(cur['exp_name'].toUpperCase().includes('sariya'.toUpperCase())){
            acc['sariya'] = acc['sariya'] + cur.exp_amount;
        } 
        if(cur['exp_name'].toUpperCase().includes('balu'.toUpperCase())){
            acc['balu'] = acc['balu'] + cur.exp_amount;
        } 
        if(cur['exp_name'].toUpperCase().includes('gitti'.toUpperCase())){
            acc['gitti'] = acc['gitti'] + cur.exp_amount;
        }
        if(cur['exp_name'].toUpperCase().includes('cement'.toUpperCase())){
            acc['cement'] = acc['cement'] + cur.exp_amount;
        }
        if(cur['exp_name'].toUpperCase().includes('Ring'.toUpperCase())){
            acc['Ring'] = acc['Ring'] + cur.exp_amount;
        } 
        if(cur['exp_name'].toUpperCase().includes('House Demolition'.toUpperCase())){
            acc['House Demolition'] = acc['House Demolition'] + cur.exp_amount;
        } 
        if(cur['exp_name'].toUpperCase().includes('House construction'.toUpperCase())){
            acc['House construction'] = acc['House construction'] + cur.exp_amount;
        } 
        if(cur['exp_name'].toUpperCase().includes('jcb'.toUpperCase())){
            acc['jcb'] = acc['jcb'] + cur.exp_amount;
        } 
    
        return acc;
    }, {'Labor': 0, 'Material': 0, 'Ring': 0, 'sariya': 0, 'balu': 0, 'gitti': 0, 'cement': 0, 'jcb': 0, 'House Demolition': 0, 'House construction': 0,});

    const data = {
        labels: ['Sariya', 'Balu', 'Gitti', 'Cement'],
        data: [groupedExpenses.sariya, groupedExpenses.balu, groupedExpenses.gitti, groupedExpenses.cement],
    }

    const piedata = {
        labels: ['Sariya', 'Balu', 'Gitti', 'Cement'],
        data: [groupedExpenses.sariya, groupedExpenses.balu, groupedExpenses.gitti, groupedExpenses.cement],
    }



    useEffect(() => {
        dispatch(fetchExpenses());
    }, []);

    return (
        <div>
            <Stats>
                <div className="stats-row">
                    <span className="stats-label">Labor</span>
                    <span className="stats-value">&#8377; {groupedExpenses.Labor}</span>
                </div>
                <div className="stats-row">
                    <span className="stats-label">Material</span>
                    <span className="stats-value">&#8377; {groupedExpenses.Material}</span>
                </div>
                <hr />
                <div className="stats-row">
                    <span className="stats-label">House Demolition</span>
                    <span className="stats-value">&#8377; {groupedExpenses['House Demolition']}</span>
                </div>
                <div className="stats-row">
                    <span className="stats-label">House construction</span>
                    <span className="stats-value">&#8377; {groupedExpenses['House construction']}</span>
                </div>
            </Stats>

            <div>
                <BarChart data={data} bartitle="Material Expenses"/>
            </div>

            <div>
                <PieChart data={piedata} bartitle="Material Expenses ratio" />
            </div>
        </div>
    )
}

export default Visualize;
