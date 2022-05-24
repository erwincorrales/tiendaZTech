import { http } from "./http";

const getCustomers = async () =>{
    try {
        const response = await http.get(`/api/customers`);
        return response.data;
    } catch (error) {
        return error
    }
}

const getCustomer = async nit =>{
    try {
        const response = await http.get(`/api/customers/${nit}`)
        return response.data;
    } catch (error) {
        return error
    }
}

const saveCustomer = async customer =>{
    try {
        const response = await http.post(`/api/customers`, customer)
        return response.data;
    } catch (error) {
        return error
    }
}

const updateCustomer = async customer =>{
    try {
        const response = await http.patch(`/api/customers`, customer)
        return response.data;
    } catch (error) {
        return error
    }
}


const deleteCustomer = async nit =>{
    try {
        const response = await http.delete(`/api/customers/${nit}`);
        return response.data;
    } catch (error) {
        return error
    }
}

export default {getCustomers, getCustomer, saveCustomer, updateCustomer, deleteCustomer}