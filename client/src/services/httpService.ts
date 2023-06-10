// import { AuthClient } from '../pages/login/auth';
import {Auth} from '../pages/Login/Auth';

function getBearer(): string {
    //const auth = new Auth();

    if(Auth.isLoggedIn() && !Auth.isTokenExpired()) {
        return 'Bearer '+Auth.getToken().access_token;
    } else {
        return 'Bearer ';
    }
}


const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: getBearer(),
    },
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: getBearer(),
    },
    body: {},
};

export const fetchData = (url: string): Promise<any> => {
    return fetch(url, getOptions).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.json());
        }
    });
};

export const postData = (url: string, data: any): Promise<any> => {
    const strigifiedData = JSON.stringify(data);
    const currentRequestOptions = { ...requestOptions, body: strigifiedData };
    return fetch(url, currentRequestOptions).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.json());
        }
    });
};

export const updateData = (url: string, data: any): Promise<any> => {
    const strigifiedData = JSON.stringify(data);
    const currentRequestOptions = { ...requestOptions, method: 'PUT', body: strigifiedData };
    return fetch(url, currentRequestOptions).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.json());
        }
    });
};

export const deleteData = (url: string, data: any): Promise<any> => {
    const strigifiedData = JSON.stringify(data);
    const currentRequestOptions = { ...requestOptions, method: 'DELETE', body: strigifiedData };
    return fetch(url, currentRequestOptions).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.json());
        }
    });
};
