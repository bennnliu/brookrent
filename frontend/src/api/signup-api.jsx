import axios from 'axios';

export const signUpAPI = async (userData) => {
    try{
        const result = await axios.post('/user/signup', userData)
        return result.data

    }
    catch(e){
        console.error(e)
    }
    
}