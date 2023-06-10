import React from 'react';
//import { AuthClient } from '../pages/login/auth';
import {Auth} from '../pages/Login/Auth';
import { RouteEnum } from './routeConstants';
import { Redirect, RouteComponentProps, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
};

function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
    //console.log('isTokenExpired: ', AuthClient.isTokenExpired())

    const isLoggedIn = () => {
        //const auth = new Auth();
        return Auth.isLoggedIn() && !Auth.isTokenExpired();
    };
    return (
        <Route
            {...rest}
            render={(props) => (isLoggedIn() ? <Component {...props} /> : <Redirect to={RouteEnum.login} />)}
        />
    );
}

export default ProtectedRoute;
