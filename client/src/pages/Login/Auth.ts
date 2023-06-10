
interface TokenInterface {
    id: string,
    access_token: string;
    refresh_token: string;
    exp: number;
}

const MIN = 50;

const MAX_AGE = MIN * 60 * 1000;

class AuthClient {

    public timer: number;
    
    public  constructor () {
        this.startRefreshInterval();
        this.timer = -1;
    }

    public startRefreshInterval = (): void => {
        console.log('token will be refreshed after ', MIN, 'min');
        this.timer = setInterval( ()=> { this.refreshAccessToken() }, MAX_AGE);
    }

    public setToken(token: TokenInterface | undefined) {
        if (token) {
            const tokenWithExp: TokenInterface = {
                ...token,
                exp: (new Date().getTime() / 1000 ) + 3600,
            }
            const tokenString: string | undefined = JSON.stringify(tokenWithExp);
            sessionStorage.setItem('token', tokenString);
        } else {
            sessionStorage.removeItem('token');
        }
    }

    public getToken(): TokenInterface | undefined {
        const tokenString: string | null = sessionStorage.getItem('token');
        const token: TokenInterface | undefined = tokenString ? JSON.parse(tokenString) : undefined;
        return token;
    }

    static getTokenValue(): TokenInterface | undefined {
        const tokenString: string | null = sessionStorage.getItem('token');
        const token: TokenInterface | undefined = tokenString ? JSON.parse(tokenString) : undefined;
        return token;
    }

    public isLoggedIn() {
        const token: TokenInterface | undefined = this.getToken();
        if(token && token.access_token ) {
            return true;
        } else {
            return false;
        }
    }

    public isTokenExpired() {
        const token: TokenInterface | undefined = this.getToken();
        const nowEpoch = Math.floor(new Date().getTime() / 1000);
        
        if(token && nowEpoch > token.exp ) {
            return true;
        } else {
            return false;
        }
    }

    public getAccessToken(req: {username: string, password: string}) {
        const getOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req),
        };
        const URL = 'https://xpanzo.herokuapp.com/api/login';
        fetch(URL, getOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.json());
            }
        }).then((result: TokenInterface) => {
            this.setToken(result);
            window.location.href =  window.location.origin+'/#/dashboard';
        }).catch((err: any) =>{
            sessionStorage.removeItem('token');
            return Promise.reject('Access Token failed!!');
        });
    }

    public refreshAccessToken() {
        const token: TokenInterface | undefined = this.getToken();
        if (token) {
            
            console.log('REF TOKEN ', token);

            const URL = 'http://localhost:5000/api/token';
            const req = {
                id: token.id,
                refresh_token: token.refresh_token
            };
    
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token.access_token,
                },
                body: JSON.stringify(req),
            };

            console.log(postOptions);
    
            fetch(URL, postOptions).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.json());
                }
            }).then((result: TokenInterface) => {
                console.log('got the refresh token, setting session Storage');
                this.setToken(result);
            }).catch((err: any) =>{
                console.log('failed to get the ref token, ');
                return Promise.reject('Access Token failed!!');
            });
        }
    }

}

const AuthObject = (function () {
    let instance: any;

    function createInstance() {
        return new AuthClient();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();


export const Auth = AuthObject.getInstance();