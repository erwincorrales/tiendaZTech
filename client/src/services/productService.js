import axios from 'axios'

const getProducts = async () =>{
    try {
        const response = await axios.get('/api/products')
        return response.data
    } catch (error) {
        return error;
    }
}

const getProduct = async id =>{
    try {
        const response = await axios.get(`/api/product/${id}`)
        return response.data
    } catch (error) {
        return error;
    }
}

const saveProduct = async product =>{
    try {
        const response = await axios.post(`/api/product`, product)
        return response.data
    } catch (error) {
        return error;
    }
}

const updateProduct = async product =>{
    try {
        const response = await axios.patch(`/api/product`, product)
        return response.data
    } catch (error) {
        return error;
    }
}

const deleteProduct = async id =>{
    try {
        const response = await axios.delete(`/api/product/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

export default {getProducts, getProduct, saveProduct, updateProduct, deleteProduct}