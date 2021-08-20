import React from 'react' 
import { Row, Col, Button } from 'react-bootstrap'

const Customer = ({customer, setNit, handleDelete}) =>{
    return(
        <div className = 'rounded p-3 my-2 bg-light shadow-sm small text-dark'>
            <Row className='align-items-center'>
                <Col xs='12' lg='3'><b>{customer?.name}</b></Col>
                <Col xs='12' lg='1'>{customer?.nit}</Col>
                <Col xs='12' lg='3'>{customer?.email}</Col>
                <Col xs='12' lg='3'>{customer?.addr}</Col>
                <Col xs='12' lg='2' className='text-right d-flex flex-nowrap'>
                    <Button variant='success' className='pr-2' size='sm'  onClick={()=>setNit(customer.nit)}>DETAILS</Button>
                    <Button variant='danger' size='sm' onClick={()=>handleDelete(customer.nit)}>DELETE</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Customer