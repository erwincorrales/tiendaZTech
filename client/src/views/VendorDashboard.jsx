import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ToastMessage from '../components/common/Toast'
import VendorDetails from '../components/Vendors/VendorDetails'

import vendorsService from './../services/vendor'

const VendorDashboard = () =>{
    const [ vendors, setVendors ] = useState([])
    const [ toastMessage, setToastMessage ] = useState('')
    const [ nit, setNit ] = useState(0)
    const [ refreshVendorsList, setRefreshVendorsList ] = useState(false)

    const handleRefreshVendorList = () => setRefreshVendorsList(!refreshVendorsList)

    const handleDelete = async (nit) =>{
        const res = await vendorsService.deleteVendor(nit)
        if(!res.error){
            setToastMessage('vendor Deleted!')
            handleRefreshVendorList()
        }
        else
            setToastMessage(res?.error)
    }

    useEffect(()=>{
        vendorsService.getVendors()
        .then(res => setVendors(res.vendors))
        .catch(error => setToastMessage(error.error))
    },[refreshVendorsList])

    return(
        <Container fluid className='vh-100 w-100 m-0 p-0'>
            <VendorDetails nit = {nit} setNit={setNit} externalRefresh = {handleRefreshVendorList}/>
            {
                vendors?.map( (vendor, key) =>(
                    <Row key={key} className = 'rounded bg-white p-3 mt-2 mx-0 align-items-center noGutters'>
                        <Col sm='5' lg='2'>{vendor.nit}</Col>
                        <Col sm='7' lg='3'><b>{vendor.name}</b></Col>
                        <Col sm='12' lg='3'>{vendor.email}</Col>
                        <Col sm ='6' lg='2'>{vendor.addr}</Col>
                        <Col sm='6'  lg='2'className='d-flex flex-nowrap justify-content-end'>
                            <Button size='sm' variant='success' className = 'mx-2' onClick={()=>setNit(vendor.nit)}>DETAILS</Button>
                            <Button size='sm' variant = 'danger' onClick={()=>handleDelete(vendor.nit)}>DELETE</Button>
                        </Col>
                    </Row>
                ))
            }
            <ToastMessage message = {toastMessage} close = {setToastMessage} />
        </Container>
    )
}

export default VendorDashboard
