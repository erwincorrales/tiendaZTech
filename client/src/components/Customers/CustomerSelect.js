import React, { useEffect, useState } from 'react'
// import { Form } from 'react-bootstrap'

import customerService from '../../services/customer'

const CustomerSelect = ({onChange, value}) =>{
    const [customers, setCustomers] = useState([])
    
    useEffect(()=>{
        // customerService.getCustomers()
        // .then(res=>setCustomer(res.customer))
        // .catch(res=>console.log(res.error))
        const fetchData = async () =>{
            const res = await customerService.getCustomers()
            if(!res?.error){
                setCustomers(res.customers)
            }
            else console.log(res.error)
        } 
        fetchData()
    },[])

    return(
        <select onChange={onChange} value={value}>
            <option value = {0} >Select Customer</option>
            {
                customers?.map((cu, key)=>(
                    <option key={key} value={cu.nit}>{cu.name}</option>
                ))
            }
        </select>
    )
}

export default CustomerSelect