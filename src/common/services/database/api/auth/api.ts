import Cookies from 'js-cookie';
import { callApi, getEndpoint } from '@services';

export const login = (username, password) => {
    const endpoint = getEndpoint('/auth/login');
    return callApi(endpoint, 'POST', { username, password }).then(res => {
        const xAccessToken = res.data.access_token;
        Cookies.set(process.env.NEXT_PUBLIC_X_ACCESS_TOKEN, xAccessToken);

        localStorage.setItem('user.id', res.data.user.id);
        localStorage.setItem('user.name', res.data.user.name);
        
        return true;
    });
};

export const logout = () => {
    Cookies.remove(process.env.NEXT_PUBLIC_X_ACCESS_TOKEN);

    localStorage.removeItem('user.id');
    localStorage.removeItem('user.name');

    return true;
};