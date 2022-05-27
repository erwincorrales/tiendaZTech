import React, { useEffect, useState } from 'react' 
import { Container } from 'react-bootstrap'

import ToastMessage from '../components/common/Toast'

import Invoice from '../components/Invoices/Invoice'
import invoicesService from '../services/invoices'
import productService from '../services/product'
import { createReport } from '../components/Invoices/InvoicePDFReport'

const InvoiceDashboard = () =>{
    const [ invoices, setInvoices ] = useState([])
    const [ refresh, setRefresh ] = useState(false)
    const [ toastMessage, setToastMessage ] = useState('')

    const handleDelete = async id =>{
        const res = await invoicesService.deleteInvoice(id)
        if(!res.error){
            setToastMessage('Invoice deleted!')
            setRefresh(!refresh)
        }
        else
            setToastMessage(res?.error ?? 'error')
    }

    useEffect(()=>{
        invoicesService.getInvoices()
        .then(res => setInvoices(res.invoices))
        .catch(error=> error?.error)
    },[refresh])

    useEffect(()=>{
        productService.getProducts()
        .then(res => setProducts(res.products))
        .catch(error => setToastMessage(error?.error))
    },[])

    return(
        <Container fluid className='px-0 pt-5 pb-3 my-3 overflow-auto vh-100'>
                {
                    invoices?.map((invoice, key)=>(
                        <Invoice 
                            key={key} 
                            invoice={invoice} 
                            handleDelete={handleDelete} 
                            handleReport={invoiceId => createReport(invoices, invoiceId) }
                        />
                    ))
                }
                <ToastMessage message = {toastMessage} close= {setToastMessage} />
        </Container>
    )
}

export default InvoiceDashboard