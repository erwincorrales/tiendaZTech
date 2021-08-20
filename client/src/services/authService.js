import axios from 'axios'

const authenticate = async credentials =>{
    try {
        const response = await axios.post('/login', credentials)
        return response.data
    } catch (error) {
        return error;
    }
}

export default {authenticate} 
