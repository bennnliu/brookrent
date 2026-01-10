import axios from 'axios'

const devURL = 'http://localhost:3000/api'
const prodURL = '/api' 

const api = axios.create({
    baseURL: devURL,
    withCredentials: true, 
})

api.interceptors.request.use((req) => {
    return req
}, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
           window.location.replace('/auth/login');
        }
        return Promise.reject(error);
    }
);

export default api