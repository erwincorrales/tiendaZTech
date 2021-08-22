import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import customerService from '../../services/customer'

const CustomerSelect = ({onChange, value}) =>{
    const [customers, setCustomers] = useState([])
    
    useEffect(()=>{
        customerService.getCustomers()
        .then(res=>setCustomers(res.customers))
        .catch(res=>console.log(res.error))
    },[])

    return(
        <select onChange={onChange} value={value} className='py-2' >
            <option>Select Customer</option>
            {
                customers?.map((cu, key)=>(
                    <option key={key} value={cu.nit}>{cu.name}</option>
                ))
            }
        </select>
    )
}

export default CustomerSelect