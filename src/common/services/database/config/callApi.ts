import axios from 'axios';
import Cookies from 'js-cookie';

const headers = {
    'Content-Type': 'application/json',
    'access-control-request-origin': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization'
};

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const authHeader: string = process.env.NEXT_PUBLIC_X_ACCESS_TOKEN;
    const accessToken: string = Cookies.get(authHeader);
    config.headers = {
        ...config.headers,
        ...headers,
        [authHeader]: `Bearer ${accessToken}`
    };
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
}, async function (error) {
    // Any status¬ codes that falls outside the range of 2xx cause this function to trigger
    const status = error.response.status;
    const returnUrl = encodeURI(window.location.pathname + window.location.search);
    switch (status) {
        case 401:
            if(window.location.pathname !== '/login') {
                window.location.href = `/login?returnUrl=${returnUrl}`;
            }
            break;
        case 404:
            break;
        default:
            return Promise.reject(error);
    }
});


export const callApi = (endpoint: string, method: any, body?: any, isBlob = false) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + endpoint;
    const responseType = isBlob ? 'blob' : 'json';

    return axios({
        url: url,
        method: method,
        data: body || {},
        responseType
    }).then(res => {
        if (res?.status !== 200 && res?.status !== 201) throw res;
        return res;
    });
};
