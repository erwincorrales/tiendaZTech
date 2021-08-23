import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import customerService from '../../services/customer'

const CustomerSelect = ({onChange, value}) =>{
    const [customers, setCustomers] = useState([])
    
    useEffect(()=>{
        customerService.getCustomers()
        .then(res=>setCustomers(res.customers))
        .catch(res=>console.log(res.error))
    },[])

    return(
        <SELECT onChange={onChange} value={value} className='p-1' >
            <option>Select Customer</option>
            {
                customers?.map((cu, key)=>(
                    <option key={key} value={cu.nit}>{cu.name}</option>
                ))
            }
        </SELECT>
    )
}

const SELECT = styled.select`
    appearance: none;
    --webkit-appearance: none;
`

export default CustomerSelect