import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const devURL = 'http://localhost:3000/api'
const prodURL = '/api'

const isTokenExpired = (token) => {
    if(!token) return true
    try{
        const decoded = jwtDecode(token)
        if(decoded.exp < (Date.now() / 1000)) return true
        return false
    }
    catch(e){
        console.log(e)
        return false
    }
}

const api = axios.create({
    baseURL: devURL
})

api.interceptors.request.use((req) => {

    const token = localStorage.getItem("jwtToken")
    if(token){
        if(isTokenExpired(token)){
            localStorage.removeItem('jwtToken')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            window.location.href = '/auth/login';
        }
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api