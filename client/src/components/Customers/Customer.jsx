import React from 'react' 
import { Row, Col } from 'react-bootstrap'

const Customer = ({customer, setNit, handleDelete}) =>{
    return(
        <div className = 'rounded p-2 my-2 bg-light shadow-sm small text-dark'>
            <Row className='align-items-center'>
                <Col xs='12' lg='2'>{customer?.nit}</Col>
                <Col xs='12' lg='3'>{customer?.name}</Col>
                <Col xs='12' lg='3'>{customer?.addr}</Col>
                <Col xs='12' lg='3'>{customer?.email}</Col>
                <Col xs='12' lg='1' className='text-right d-inline'>
                    <i className='material-icons text-secondary pr-2' onClick={()=>setNit(customer.nit)}>edit</i>
                    <i className='material-icons text-danger' onClick={()=>handleDelete(customer.nit)}>block</i>
                </Col>
            </Row>
        </div>
    )
}

export default Customer