import React, { useState } from 'react';
import AppLayout from '../App-Layout';
import { Switch, Route, Link, NavLink } from "react-router-dom";
import MobileAppAHeader from '../../components/app-header';
import ExpenseList from './ExpenseList';
import CreatePurchase from './CreatePurchase';
import CreateServicePaid from './CreateServicePaid';
import { PageNavWrapper } from '../Vendor-Mgt/Vendor';

interface Props  {
    match: any;
    location: any;
    history: any;
    staticContext: any;
}

export const Expense = (props: Props) => {


    
    console.log('espense page props ', props.location.pathname);
    return (
        <AppLayout>
            <div>
                <MobileAppAHeader />
                <div className="app-dynamic-content">
                    <PageNavWrapper>
                        <NavLink className="btn-link" activeClassName={props.location.pathname === '/expense' ? 'active-tab' : ''} to={`/expense`}>Expenses</NavLink>
                        <NavLink className="btn-link" activeClassName="active-tab"  to={`/expense/createpurchase`}>Material Purchase</NavLink>
                        <NavLink className="btn-link" activeClassName="active-tab"  to={`/expense/createservice`}>Labor/Contract Pay</NavLink>
                    </PageNavWrapper>
                    <Switch>
                        <Route path={'/expense/createpurchase'} component={ () => <CreatePurchase title="createpurchase"/>} />
                        <Route path={'/expense/createservice'} component={ () => <CreateServicePaid title="createservice"/>} />
                    </Switch>
                    { props.location.pathname === '/expense' ? <Route path={'/expense'} component={ () => <ExpenseList />} /> : null }
                </div>
            </div>
            
        </AppLayout>
    )
}

export default Expense;
