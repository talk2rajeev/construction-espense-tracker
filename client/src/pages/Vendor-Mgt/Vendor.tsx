import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, NavLink } from "react-router-dom";
import CreateVendor from './CreateVendor';
import CreateProvider from './CreateProvider';
import VendorList from './VendorList';
import LaborList from './LaborList';
import AppLayout from '../App-Layout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVendors, createVendor } from '../../redux/reducers/vendor/actions';
import { fetchLabors, createLabor } from '../../redux/reducers/labor/actions';


export const PageNavWrapper = styled.nav`
    display: flex;
    justify-content: space-around;
    .link-main-title {
        text-align: center;
        color: #555;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .btn-link{
        background: #f5f5f5;
        color: #434343;
        font-size: 13px;
        text-decoration: none;
        display: inline-block;
        padding: 5px 12px;
        margin-right: 5px;
    }
    .btn-link.plus{
        padding-top: 7px;
        padding-bottom: 6px;
    }
    .active-tab{
        background: #199387;
        color: #fff;
    }
`;



interface Props {
    match: any;
    location: any;
    history: any;
    staticContext: any;
}

const Bar = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16" height="18" viewBox="0 0 16 16" width="16">
            <g fill="#fff">
                <path d="m1 1h16v4h-16z"/>
                <path d="m1 7h16v4h-16z"/>
                <path d="m1 13h16v4h-16z"/>
            </g>
        </svg>
    )
}

const Vendor = (props: Props) => {

    const dispatch = useDispatch();
    const vendors = useSelector((state: any) => state.vendors);
    const labors = useSelector((state: any) => state.labors);

    const addVendor = (vendor: any) => {
        dispatch(createVendor(vendor));
    }

    const addLabor = (labor: any) => {
        dispatch(createLabor(labor));
    }

    useEffect(() => {
        props.history.push('/vendor/vendors');

        dispatch(fetchVendors());
        dispatch(fetchLabors());
    }, [])

    console.log('vendor page props ', props.location.pathname);

    return (
        <AppLayout>
            <div className="app-dynamic-content">
                <div>
                    <PageNavWrapper>
                        <div>
                            <div className="link-main-title">Vendor</div>
                            <NavLink className="btn-link" activeClassName="active-tab" to={`/vendor/vendors`}><Bar /></NavLink>&nbsp;
                            <NavLink className="btn-link plus" activeClassName="active-tab" to={`/vendor/vendorcreate`}><span style={{fontSize: '1.2em', fontWeight: 700}}>&#43;</span></NavLink>&nbsp;
                        </div>
                        <div>
                            <div className="link-main-title">Labor/Contractor</div>
                            <NavLink className="btn-link" activeClassName="active-tab" to={`/vendor/serviceproviders`}><Bar /></NavLink>&nbsp;
                            <NavLink className="btn-link plus" activeClassName="active-tab" to={`/vendor/servicecreate`}><span style={{fontSize: '1.2em', fontWeight: 700}}>&#43;</span></NavLink>&nbsp;
                        </div>
                    </PageNavWrapper>
                    <Switch>
                        <Route path={'/vendor/vendors'} component={ () => <VendorList vendors={vendors} />} />
                        <Route path={'/vendor/vendorcreate'} component={ () => <CreateVendor createVendor={addVendor} />} />
                        <Route path={'/vendor/serviceproviders'} component={ () => <LaborList labors={labors} /> } />
                        <Route path={'/vendor/servicecreate'} component={() => <CreateProvider createLabor={addLabor} /> } />
                    </Switch>
                    {/* props.location.pathname === '/vendor' ? <Route path={'/vendor'} component={ () => <VendorList vendors={vendors} />} /> : null */}
                </div>
            </div>
        </AppLayout>
        
    )
}

export default Vendor;