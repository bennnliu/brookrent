import axios from 'axios'

const prodURL = 'https://api.brookrents.com/api' 
const devURL = 'http://localhost:3000/api'

const api = axios.create({
    baseURL: prodURL,
    withCredentials: true, 
})

api.interceptors.request.use((req) => {
    return req
}, (error) => {
    
})

api.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
    }
);

export default api