import React, {ReactElement} from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RouteEnum } from '../../app/routeConstants';
import { Loader } from '../../components';

const AppNavWrapper = styled.nav`
    flex-direction: column;
    display: flex;
    width: 100%;
    .nav-tab{
        height: 50px;
        a{
            text-decoration: none;
            color: #fff;
            width: 100%;
            display: block;
            text-align: center;
            padding: 16px 0;
        }
        .active-tab{
            border-left: 6px solid #367568;
            font-weight: bold;
            box-sizing: border-box;
            background: #fff;
            color: #3a9683;
        }
    }

    @media only screen and (max-width: 768px) {
        flex-direction: row;
        background: #f5f5f5;
        position: fixed;
        bottom: 0;
        z-index: 1;
        .nav-tab {
            height: 39px;
            flex: 1;
            text-align: center;
            a {
                color: #28324d;
                width: 100%;
                display: block;
                padding: 10px 0px;
            }
            .active-tab{
                color: #28324d;
                border: none;
                box-shadow: inset 0 2px 0 #f05451;
                font-weight: bold;
            }
        }
    }
`;

const AppStats = styled.div`
    margin-top: 50px;
    .stats-box {
        padding: 15px 20px;
        text-align: center;
        border-bottom: 1px solid #4dae9a;
    }
    .title {
        font-size: 16px;
        font-weight: 600;
        color: #92cdbf;
        margin-bottom: 10px;
    }
    .value {
        font-size: 22px;
        font-weight: bold;
        color: #85b9ae;
    }
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const AppSection = styled.div`
    width: 100%;
    @media only screen and (max-width: 768px) {

    }
`;

const AppSectionHeader = styled.div`
    background: #1a4f49;
    padding: 21px 20px;
    @media only screen and (max-width: 768px) {
        padding: 15px 10px;
        background: #0e4641;
    }
`;

interface Props {
    children: ReactElement
}

const AppLayout = (props: Props) => {

    const dispatch = useDispatch();
    const {title, msg, pageLoading} = useSelector((state: any) => state.pageLoader);

    const dateChange = (e: any) => {
        console.log(e.target.value);
    }

    
    return (
        <div className="app">
            <aside className="app-sidebar">
                <h2 className="app-title">Expense Tracker</h2>
                {
                    pageLoading ? <Loader title={title} message={msg} /> : null
                }
                <AppNavWrapper>
                    <div className="nav-tab">
                        <NavLink activeClassName="active-tab" to={RouteEnum.dashboard}>Dashboard</NavLink>&nbsp;&nbsp;
                    </div>
                    <div className="nav-tab">
                        <NavLink activeClassName="active-tab" to={RouteEnum.expense}>Expense</NavLink>
                    </div>
                    <div className="nav-tab">
                        <NavLink activeClassName="active-tab" to={RouteEnum.vendor}>Vendor</NavLink>&nbsp;&nbsp;
                    </div>
                </AppNavWrapper>
                <AppStats>
                    <div className="stats-box">
                        <h5 className="title">Total</h5>
                        <h2 className="value">&#8377; 133,600.00</h2>
                    </div>
                    <div className="stats-box">
                        <h5 className="title">Outstanding</h5>
                        <h2 className="value">&#8377; 14,342.00</h2>
                    </div>
                    <div className="stats-box">
                        <h5 className="title">paid</h5>
                        <h2 className="value">&#8377; 14,342.00</h2>
                    </div>
                </AppStats>
            </aside>
            <section className="app-section">
                <section className="app-content">
                    <div>
                        { props.children }
                    </div>
                </section>
            </section>
            <footer>

            </footer>
            
        </div>
    )
}

export default AppLayout;
