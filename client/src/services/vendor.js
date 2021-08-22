import axios from 'axios'

const url = '/api/vendors'

const getVendors = async () =>{
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return error
    }
}

const getVendor = async nit =>{
    try {
        const response = await axios.get(`${url}/${nit}`)
        return response.data
    } catch (error) {
        return error
    }
}

const saveVendor = async vendor =>{
    try {
        const response = await axios.post(url, vendor)
        return response.data
    } catch (error) {
        return {error}
    }
}

const updateVendor = async vendor =>{
    try {
        const response = await axios.patch(url, vendor)
        return response.data
    } catch (error) {
        return {error}
    }
}

const deleteVendor = async nit =>{
    try {
        const response = await axios.delete(`${url}/${nit}`)
        return response.data
    } catch (error) {
        return error
    }
}

export default { getVendors, getVendor, saveVendor, updateVendor, deleteVendor }