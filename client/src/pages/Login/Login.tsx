import React, { useState } from 'react';
import styled from 'styled-components';
import { Loader, InputText, Button } from '../../components';
import {Auth} from './Auth';

const LoginBoxWrapper = styled.div`
    width: 500px;
    padding: 30px 20px;
	height: auto;
    margin: 200px auto 0;
    background-color: #f6f4f4;
	border-radius: 4px;
	position: relative;
    border: 1px solid #efefef;
    z-index: 1;
    box-sizing: border-box;

    .input-label-wrapper {
        margin-bottom: 15px;
    }
    .input-label {
        display: block;
        width: 100%;
        margin-bottom: 5px;
        color: #555;
    }

    @media only screen and (max-width: 768px) {
        width: 90%;
        .btn {
            width: 100%;
        }
    }
`;

const Alert = (props: {type: string, title: string}) => {
    if (props.type === 'error') return <div style={{color: 'red'}}>{props.title}</div>
    else if (props.type === 'warning') return <div style={{color: 'orange'}}>{props.title}</div>
    else return <div>{props.title}</div>
}

interface Props {
    
}

export const Login = (props: any) => {

    const initFormData: {username: string, password: string} = {username: '', password: ''};
    const [formData, setFormData] = useState(initFormData);
    const [loginError, setLoginError] = useState('');

    const onInputChange = (name: string, value: string) => {
        let newFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(newFormData);
    }

    const onLogin = (e: any) => {
        e.preventDefault();
        let errorMsgArr: Array<string> = [];
        if (formData.username === '') {
            errorMsgArr.push('Username');
        }
        if (formData.password === '') {
            errorMsgArr.push('Password');
        }
        if (errorMsgArr.length > 0) {
            setLoginError('Please enter '+errorMsgArr.join(','));
            return false
        } else {
            //const auth = new Auth();
            Auth.getAccessToken(formData);
            //props.history.push('/redirect');
        }
    }

    return (
        <div>
            
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#17a2b8" fillOpacity="1" d="M0,128L48,154.7C96,181,192,235,288,250.7C384,267,480,245,576,245.3C672,245,768,267,864,277.3C960,288,1056,288,1152,245.3C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            <LoginBoxWrapper>
                <form method="post" onSubmit={onLogin}> 
                    <div className="login" >
                        <div className="input-label-wrapper">
                            <label className="input-label" htmlFor="username">Username</label>
                            <InputText name="username" onChange={onInputChange} />
                        </div>
                        <div className="input-label-wrapper">
                            <label className="input-label" htmlFor="password">Password</label>
                            <input className="text-input" type="password" name="password" onChange={(e) => {onInputChange("password", e.target.value)}} />
                        </div>
                        <div className="input-label-wrapper">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <Alert type="error" title={loginError} />
                        </div>
                    </div>
                </form>
            </LoginBoxWrapper>
            
            <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#17a2b8" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,37.3C384,32,480,32,576,69.3C672,107,768,181,864,224C960,267,1056,277,1152,240C1248,203,1344,117,1392,74.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    )
}

export default Login;
