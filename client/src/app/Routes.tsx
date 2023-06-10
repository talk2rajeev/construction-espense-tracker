import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, HashRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Redirect from '../pages/Login/Redirect';
import Dashbaord from '../pages/Dashboard';
import Vendor from '../pages/Vendor-Mgt';
import Expense from '../pages/Expense-Mgt';
import { RouteEnum } from './routeConstants';


const NotFound = () => <div>Page Not Found</div>;


const Routes = (props: any) => {
    return (
        <HashRouter>
            <div>
            <Switch>
                <Route exact path={RouteEnum.login} component={Login} />
                <Route exact path={RouteEnum.redirect} component={Redirect} />
                <ProtectedRoute  path={RouteEnum.dashboard} component={Dashbaord} />
                <ProtectedRoute  path={RouteEnum.vendor} component={Vendor} />
                <ProtectedRoute  path={RouteEnum.expense} component={Expense} />
                <Route component={NotFound} />
            </Switch>
            </div>
        </HashRouter>
    );
};

export default Routes;

