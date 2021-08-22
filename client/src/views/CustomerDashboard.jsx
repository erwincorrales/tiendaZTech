import React, { useEffect , useState} from 'react'
import { Container } from 'react-bootstrap'
import Customer from '../components/Customers/Customer'
import CustomerDetails from '../components/Customers/CustomerDetails'
import ToastMessage from '../components/common/Toast'

import customerService from '../services/customer'

const CustomerDashboard = () =>{
    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handleRefreshCustomerList = ()=>{
        setRefresh(!refresh)
    }

    const handleDelete = async nit =>{
        const res = await customerService.deleteCustomer(nit)
        if(!res?.error) {
            setToastMessage('Customer deleted!')
            setRefresh(!refresh)
        }
        else
            setToastMessage(res?.error)
    }
    
    useEffect(()=>{
        const fetchCustomers = async()=>{
            const res = await customerService.getCustomers()
            if(!res?.error)
                setCustomers(res.customers)
            else
                setToastMessage(res?.error)
        }
        fetchCustomers()
    },[refresh])
    
    return(
        <Container fluid className='pt-3'>
            <CustomerDetails nit={customerId} externalRefresh={handleRefreshCustomerList} setNit={setCustomerId}/>
            <Container fluid className ='text-white overflow-auto' style={{height: 'calc(100vh - 100px'}}>
            {
                customers?.map((customer, key)=>(
                        <Customer customer={customer} key={key} setNit={setCustomerId} handleDelete={handleDelete}/>
                    ))
                }
            </Container>
            <ToastMessage message={toastMessage} close={setToastMessage} />
        </Container>
    )
}

export default CustomerDashboard
