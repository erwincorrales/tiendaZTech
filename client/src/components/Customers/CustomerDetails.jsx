import React , { useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap' 
import customerService from '../../services/customer'
import ToastMessage from '../common/Toast'

const CustomerDetails = ({nit, externalRefresh, setNit}) =>{
    const [show, setShow] = useState(false)
    const customerInitialState = {nit: '', name:'', addr: '', email:'', phone:''}
    const [customer, setCustomer] = useState(customerInitialState)
    const errorsInitialState = {nit: false, name:false, addr: false, email:false, phone:false}
    const [errors, setErrors] = useState(errorsInitialState)
    const [toastMessage, setToastMessage] = useState('')
    
    const handleToggle = () =>{
        setShow(!show)
        if(show) {
            setNit(0)
            setCustomer(customerInitialState)
        }
    } 

    const handleChange = e =>{
        const {name, value} = e.target 
        setCustomer({...customer, [name]: value})
        if(!value) setErrors({...errors, [name]: true})
        else setErrors({...errors, [name]:false})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        if(nit){
            const res = await customerService.updateCustomer(customer)
            if(!res.error){
                setToastMessage('Customer Updated!')
                externalRefresh()
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }else{
            const res = await customerService.saveCustomer(customer)
            if(!res.error){
                setToastMessage('Customer Saved!')
                externalRefresh()
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }
    }

    useEffect(()=>{
        const fetchCustomers = async() =>{
            const res = await customerService.getCustomer(nit)
            if(!res.error){
                setCustomer(res.customer)
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }
        if(nit) fetchCustomers()
    },[nit])

    return (
        <>
            <Button className='mt-5 pt-2' size='sm' variant ='dark' onClick={handleToggle}>+ Add Customer</Button>
            <Modal show={show} onHide= {handleToggle} centered >
                <Modal.Header closeButton>
                    {nit ? 'Edit' : 'Add'} Customer
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        Nit 
                        <Form.Control type = 'number' name='nit' onChange={handleChange} value={customer?.nit} isInvalid={errors.nit} required/>
                        Name 
                        <Form.Control type = 'text' name='name' onChange={handleChange} value={customer?.name} isInvalid={errors.nit} required/>
                        Address 
                        <Form.Control type = 'text' name='addr' onChange={handleChange} value={customer?.addr} isInvalid={errors.nit} required/>
                        Email 
                        <Form.Control type = 'email' name='email' onChange={handleChange} value={customer?.email} isInvalid={errors.nit} required/>
                        Phone
                        <Form.Control type = 'number' name='phone' onChange={handleChange} value={customer?.phone} isInvalid={errors.nit} required/>
                        <div className='mt-3 d-flex justify-content-between'>
                            <Button variant = 'outline-dark' size='sm' onClick={handleToggle}>Cancel</Button>
                            <Button variant='primary' type='submit'>{nit ? 'Edit': 'Save'}</Button>
                        </div>    
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastMessage message={toastMessage} close={setToastMessage}/>
        </>
    )
}

export default CustomerDetails;