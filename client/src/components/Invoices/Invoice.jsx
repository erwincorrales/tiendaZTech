import React from 'react' 
import { Row, Col, Button } from 'react-bootstrap'

const Invoice = ({invoice, handleDelete}) =>{
    
    const itemsCount = arrayitems =>{
        try{
            let count = JSON.parse(arrayitems)
            return count.length
        }catch(err){
            return 0
        }
    }

    return(
        <div className = 'rounded p-3 mt-3 bg-light shadow-sm small text-dark'>
            <Row className='align-items-center'>
                <Col xs='12' lg='1'>ID: {invoice?.id}</Col>
                <Col xs='12' lg='3'><b>{invoice?.name}</b></Col>
                <Col xs='12' lg='2'>{invoice?.userId}</Col>
                <Col xs='12' lg='2'>Items: {itemsCount(invoice.arrayItems)}</Col>
                <Col xs='12' lg='2'>{invoice?.date}</Col>
                <Col xs='12' lg='1'><b>$ {invoice?.amount}</b></Col>
                <Col xs='12' lg='1' className='text-right d-inline'>
                    <Button variant='danger' size='sm' onClick={()=>handleDelete(invoice.id)}>DELETE</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Invoice