import React, { useCallback , useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import CustomerSelect from '../Customers/CustomerSelect'
import ToastMessage from './../common/Toast'

import invoicesService from '../../services/invoices'
import { reduceCartProductsSelected } from './../../utils/functions'

const Cart = ({products, cartItems, removeCartItem }) =>{

    const [customerNit, setCustomerNit] = useState(0)
    const [toastMessage, setToastMessage ] = useState('')

    const totalAmountCalculator = useCallback( items =>{
        let total = items?.reduce((acc, it)=> acc + it.price, 0)
        return new Intl.NumberFormat({style:'currency'}).format(total) || 0
    },[cartItems])

    const totalItemsCalc = items =>{
        return items?.reduce((acc, it)=> acc + it.cant, 0)
    }

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
            date: new Date().toLocaleString(),
            arrayItems: JSON.stringify(reduceCartProductsSelected([...cartItems])),
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
        <Container fluid className='bg-light py-2 m-0 w-100'>
            <Row noGutters className='align-items-center'>
                <Col xs='2'  md='2' >Cart</Col>
                <Col xs='10' md='2' className ='float-right d-flex justify-content-end'>
                    <CustomerSelect 
                        onChange={handleCustomerSetNit} 
                        value={customerNit}
                    />
                 </Col>
                <Col xs='3' md='3'>Items: {cartItems.length }</Col>
                <Col xs='3' md='2'>
                    <h3 className='m-0 p-0'>${totalAmountCalculator(cartItems)}</h3>
                </Col>
                <Col className='text-right justify-content-end d-flex'> 
                    <Button variant='secondary' className='mx-2' onClick={clearCart}>Clear</Button>
                    <Button size ='lg' variant='success' onClick={handleSubmitInvoice}><b>Buy</b></Button>
                </Col>
            </Row>
            <ToastMessage message={toastMessage} close = {setToastMessage} />
        </Container>
    )
}

export default Cart