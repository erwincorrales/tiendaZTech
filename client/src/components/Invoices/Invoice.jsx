import React, { useState } from 'react' 
import { Row, Col, Button } from 'react-bootstrap'
import styled from 'styled-components'

import { cartTotalItems } from '../../utils/functions'

const Invoice = ({invoice, handleDelete, handleReport}) =>{
    const [ collapseShow, setCollapseShow ] = useState(false)
    
    const itemsCount = arrayitems =>{
        try{
            let count = JSON.parse(arrayitems)
            return cartTotalItems(count)
        }catch(err){
            return []
        }
    }

    return(
            <DIV 
                onMouseEnter = {()=>setCollapseShow(!collapseShow)} 
                onMouseLeave={()=>setCollapseShow(!collapseShow)} 
                className='m-0 p-0 bg-white border-bottom w-100 rounded small mt-2'
            >
                <Row className='align-items-center shadow p-3 m-0 border-bottom'>
                    <Col xs='12' lg='1'>ID: {invoice?.id}</Col>
                    <Col xs='5' lg='1'>{invoice?.userId}</Col>
                    <Col xs='7' lg='3'><b>{invoice?.name}</b></Col>
                    <Col xs='12' lg='2'>{invoice?.date}</Col>
                    <Col xs='5' lg='2'><b>
                        {itemsCount(invoice.arrayItems)} item(s)
                    </b></Col>
                    <Col xs='4' lg='1'><b>$ {invoice?.amount}</b></Col>
                    <Col xs='3' lg='2' className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={() => handleReport(invoice?.id)}>PDF</Button>
                        <Button variant='danger' size='sm' onClick={()=>handleDelete(invoice.id)}>DELETE</Button>
                    </Col>
                </Row>
                <div 
                    style={{display: collapseShow ? 'block' : 'none'}} 
                    className='bg-light p-3 m-0'
                >
                    {
                        JSON.parse(invoice.arrayItems)?.map((item, key) =>(
                                <Row className='border-bottom font-weight-bold align-items-center text-dark text-center' key={key}>
                                    <Col>*Cant:{item.cant}</Col>
                                    <Col>ID:{item.id}</Col>
                                    <Col>[{ item.brand }] {item.description}</Col>
                                    <Col><b>${item.price}</b></Col>
                                    <Col><b>${item.price * item.cant}</b></Col>
                                </Row>
                        ))
                    }
                </div>
            </DIV>
                    
    )
}

const DIV = styled.div`
    cursor: pointer
`

export default Invoice