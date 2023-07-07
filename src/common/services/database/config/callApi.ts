
export const callApi = (endpoint: string, method: any, body?: any, isBlob= false) =>{
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + endpoint;
    const responseType = isBlob ? 'blob' : 'json';

    return
}