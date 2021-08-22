import axios from 'axios'
const url ='/api/invoices'

const getInvoices = async() =>{
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return error
    }
}

const saveInvoice = async invoice =>{

    try {
        const response = await axios.post(url, invoice)
        return response.data
    } catch (error) {
        return error
    }
}

const deleteInvoice = async (id) =>{
    try {
        const response = await axios.delete(`${url}/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

export default { getInvoices, saveInvoice, deleteInvoice }