import axios from 'axios'

const getCustomers = async () =>{
    try {
        const response = await axios.get(`/api/customers`);
        return response.data;
    } catch (error) {
        return error
    }
}

const getCustomer = async nit =>{
    try {
        const response = await axios.get(`/api/customers/${nit}`)
        return response.data;
    } catch (error) {
        return error
    }
}

const saveCustomer = async customer =>{
    try {
        const response = await axios.post(`/api/customers`, customer)
        return response.data;
    } catch (error) {
        return error
    }
}

const updateCustomer = async customer =>{
    try {
        const response = await axios.patch(`/api/customers`, customer)
        return response.data;
    } catch (error) {
        return error
    }
}


const deleteCustomer = async nit =>{
    try {
        const response = await axios.delete(`/api/customers/${nit}`);
        return response.data;
    } catch (error) {
        return error
    }
}

export default {getCustomers, getCustomer, saveCustomer, updateCustomer, deleteCustomer}