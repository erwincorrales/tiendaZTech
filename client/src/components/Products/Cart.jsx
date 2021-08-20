import React, { useCallback } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Cart = ({products, cartItems, removeCartItem }) =>{

    const totalAmountCalculator = useCallback( (items) =>{
        let total = items?.reduce((acc, it)=> acc + it.price || 0, 0)
        return new Intl.NumberFormat({style:'currency'}).format(total) || 0
         
    },[cartItems])
    
    return(
        <Container fluid className='bg-light py-1'>
            <Row className='align-items-center small'>
                <Col>Cart</Col>
                <Col>Erwin Corrales</Col>
                <Col>Items: {cartItems?.length }</Col>
                <Col>Amount: ${totalAmountCalculator(cartItems)}</Col>
                <Col>
                    <Button>Buy</Button>
                    <Button variant='secondary' onClick={removeCartItem}>Clear</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart