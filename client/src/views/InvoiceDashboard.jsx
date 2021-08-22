import React, { useEffect, useState } from 'react' 
import { Container } from 'react-bootstrap'

import ToastMessage from '../components/common/Toast'

import Invoice from '../components/Invoices/Invoice'
import invoicesService from '../services/invoices'
import productService from '../services/product'
import InvoiceItemsList from '../components/Invoices/InvoiceItemsList'


const InvoiceDashboard = () =>{
    const [ invoices, setInvoices ] = useState([])
    const [ refresh, setRefresh ] = useState(false)
    const [ toastMessage, setToastMessage ] = useState('')
    const [ products, setProducts] = useState([])
    const [ invoiceSelected, setInvoiceSelected] = useState({})

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
        .catch(error=> error.error)
    },[refresh])

    useEffect(()=>{
        productService.getProducts()
        .then(res => setProducts(res.products))
        .catch(error => setToastMessage(error))
    },[])

    return(
        <Container fluid className='p-2 pt-5 pb-3 m-2 overflow-auto vh-100'>
                {
                    invoices?.map((inv, key)=>(
                        <Invoice key={key} invoice={inv} handleDelete={handleDelete} onClick={()=>setInvoiceSelected(inv)}/>
                    ))
                }
                <ToastMessage message = {toastMessage} close= {setToastMessage} />
                <InvoiceItemsList invoiceSelected={invoiceSelected} products={products} close={()=>setInvoiceSelected({})}/>
        </Container>
    )
}

export default InvoiceDashboard