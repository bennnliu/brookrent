import axios from 'axios'

const prodURL = '/api' 

const api = axios.create({
    baseURL: ("https://brookrents.onrender.com" + prodURL),
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
           
        }
        return Promise.reject(error);
    }
);

export default api