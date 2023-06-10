import React, { useEffect } from 'react';
import {Auth} from './Auth';

interface Props {
    
}

export const Redirect = (props: any) => {
    //const auth = new Auth();

    const tryLogin = () => {
        let count = 0;
        let timer = -1;
        
        return function checkLoginAgain(){
            console.log('Login Attemp ', count);
            timer = setTimeout(()=>{
                count++;
                if(count > 12 ){
                    clearTimeout(timer);
                    console.log('Max loop reached, Could not find value 8, terminating');
                    props.history.push('/');
                }else{
                    let isLoggedIn = Auth.isLoggedIn();
                    let isTokenExpired = Auth.isTokenExpired();
                    console.log(isLoggedIn, isTokenExpired);
                    if(Auth.isLoggedIn() && !Auth.isTokenExpired()){ 
                        clearTimeout(timer);
                        props.history.push('/dashboard');
                    } else {
                        checkLoginAgain();
                    } 
                }
            }, 1000);
        }
        
        
        
    }

    useEffect(() => {
        tryLogin()();
    })

    return (
        <div>
            <h2>Redirecting to site...</h2>
        </div>
    )
}

export default Redirect;
