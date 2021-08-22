import React , { useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap' 
import vendorService from '../../services/vendor'
import ToastMessage from '../common/Toast'

const VendorDetails = ({nit, externalRefresh, setNit}) =>{
    const [show, setShow] = useState(false)
    const vendorInitialState = {nit: '', name:'', addr: '', email:'', phone:''}
    const [vendor, setvendor] = useState(vendorInitialState)
    const errorsInitialState = {nit: false, name:false, addr: false, email:false, phone:false}
    const [errors, setErrors] = useState(errorsInitialState)
    const [toastMessage, setToastMessage] = useState('')
    
    const handleToggle = () =>{
        setShow(!show)
        if(show) {
            setNit(0)
            setvendor(vendorInitialState)
        }
    } 

    const handleChange = e =>{
        const {name, value} = e.target 
        setvendor({...vendor, [name]: value})
        if(!value) setErrors({...errors, [name]: true})
        else setErrors({...errors, [name]:false})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        if(nit){
            const res = await vendorService.updateVendor(vendor)
            if(!res.error){
                setToastMessage('vendor Updated!')
                externalRefresh()
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }else{
            const res = await vendorService.saveVendor(vendor)
            if(!res.error){
                setToastMessage('vendor Saved!')
                externalRefresh()
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }
    }

    useEffect(()=>{
        const fetchVendors = async() =>{
            const res = await vendorService.getVendor(nit)
            if(!res.error){
                setvendor(res.vendor)
                handleToggle()
            }
            else
                setToastMessage(res.error)
        }
        if(nit) fetchVendors()
    },[nit])

    return (
        <>
            <Button className='mt-5 pt-2 justify-self-end' size='sm' variant ='dark' onClick={handleToggle}>+ Add vendor</Button>
            <Modal show={show} onHide= {handleToggle} centered >
                <Modal.Header closeButton>
                   <h4> {nit ? 'Edit' : 'Add'} Vendor</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        Nit 
                        <Form.Control className='mb-2' type = 'number' name='nit' onChange={handleChange} value={vendor?.nit} isInvalid={errors.nit} required/>
                        Name 
                        <Form.Control className='mb-2'type = 'text' name='name' onChange={handleChange} value={vendor?.name} isInvalid={errors.name} required/>
                        Address 
                        <Form.Control className='mb-2'type = 'text' name='addr' onChange={handleChange} value={vendor?.addr} isInvalid={errors.addr} required/>
                        Email 
                        <Form.Control className='mb-2'type = 'email' name='email' onChange={handleChange} value={vendor?.email} isInvalid={errors.email} required/>
                        Phone
                        <Form.Control type = 'number' name='phone' onChange={handleChange} value={vendor?.phone} isInvalid={errors.phone} required/>
                        <div className='mt-4 d-flex justify-content-between'>
                            <Button variant = 'outline-dark' size='sm' onClick={handleToggle}>Cancel</Button>
                            <Button variant='success' type='submit'>{nit ? 'Edit': 'Save'}</Button>
                        </div>    
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastMessage message={toastMessage} close={setToastMessage}/>
        </>
    )
}

export default VendorDetails;