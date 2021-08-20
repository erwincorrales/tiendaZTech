import React, { useCallback , useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import CustomerSelect from '../Customers/CustomerSelect'
import ToastMessage from './../common/Toast'

import invoicesService from '../../services/invoices'

const Cart = ({products, cartItems, removeCartItem }) =>{

    const [customerNit, setCustomerNit] = useState(0)
    const [toastMessage, setToastMessage ] = useState('')

    const totalAmountCalculator = useCallback( (items) =>{
        let total = items?.reduce((acc, it)=> acc + it.price || 0, 0)
        return new Intl.NumberFormat({style:'currency'}).format(total) || 0
         
    },[cartItems])

    const handleCustomerSetNit = e =>{
        console.log('customerId', e.target.value )
        setCustomerNit(e.target.value)
    }


    const clearCart = ()=>{
        removeCartItem()
        setCustomerNit(0);
    }

    const handleSubmitInvoice = async ()=>{
        //create invoiceObject
        if(!customerNit) return setToastMessage('Customer not selected!')
        if(!cartItems.length) return setToastMessage('No Product Items has been chosen!')

        const invoice = {
            userId: customerNit,
            date: new Date().toString(),
            arrayItems: JSON.stringify(cartItems),
            amount: totalAmountCalculator(cartItems)
        }        

        const res = await invoicesService.saveInvoice(invoice)
        if(res.affectedRows){
            setToastMessage('Invoice saved!')
            clearCart()
        }
        else
            setToastMessage('There is a mistake!')
        
    }
    
    return(
        <Container fluid className='bg-light py-2'>
            <Row className='align-items-center'>
                <Col sm='1'>Cart</Col>
                <Col sm='4'>
                    <CustomerSelect 
                        onChange={handleCustomerSetNit} 
                        value={customerNit}
                    />
                </Col>
                <Col >Items: {cartItems?.length }</Col>
                <Col sm='2'>
                    <h3 className='m-0 p-0'>${totalAmountCalculator(cartItems)}</h3>
                </Col>
                <Col className='flex-nowrap'> 
                    <Button size ='lg' variant='success' onClick={handleSubmitInvoice}><b>Buy</b></Button>
                    <Button variant='secondary' size='lg' onClick={clearCart}>Clear</Button>
                </Col>
            </Row>
            <ToastMessage message={toastMessage} close = {setToastMessage} />
        </Container>
    )
}

export default Cart