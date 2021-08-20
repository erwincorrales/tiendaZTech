import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import styled from 'styled-components';
import productService from '../../services/productService';
import ToastMessage from '../common/Toast';

const ProductDetails = ({id, setId, productListRefresh}) =>{
    const [ show, setShow ] = useState(false);
    const productInitialState = {price:'', brand:'', description:'', stock:''}
    const [ product, setProduct ] = useState(productInitialState)
    const [ toastMessage, setToastMessage ] = useState('')
    const [ errors, setErrors ] = useState({brand: false, description: false, stock: false, price: false })
    

    const handleToggle = () => {
        setShow(!show)
        setProduct(productInitialState)
        if(id) setId(0)
    }
    
    const handleChange = e => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
        if(!value) setErrors({...errors, [name]: true})
        else setErrors({...errors, [name]: false})
    }

   const validate = () =>{
       let brand = false, description = false, stock= false, price= false, flag=true
       if(!product.brand) {brand = true, flag = false}
       if(isNaN(!product.price)) {price = true, flag = false}
       if(!product.description) {description = true, flag = false}
       if(isNaN(!product?.stock)) {stock = true, flag = false}
       setErrors({brand, description, stock, price})
       return flag
   }

    const handleSubmit = async e =>{
        e.preventDefault()
        if(validate()){
            if(id){
                //update product
                const res = await productService.updateProduct(product)
                if(!res.error){
                    setToastMessage('Product updated')
                    handleToggle()
                    productListRefresh()
                }
                else
                    setToastMessage(res.error?.sqlMessage)
            }else{
                const res = await productService.saveProduct(product)
                if(!res.error){
                    setToastMessage('Product saved!')
                    handleToggle()
                    productListRefresh()
                }
                else
                    setToastMessage(res.error?.sqlMessage)
            }
        }
    }
    
    const handleDelete = async(id) =>{
        const res = await productService.deleteProduct(id);
        if(!res.error){
            setToastMessage('Product Deleted!')
            productListRefresh()
            handleToggle()
        }
        else
            setToastMessage(res.error)
    }

    useEffect(()=>{
        const fetchData = async () =>{
                const res = await productService.getProduct(id);
                if(!res.error){
                    setProduct(res.product)
                    setShow(true)
                }
                else
                    setToastMessage(res.error)
        }
        if(id) fetchData()
    },[id])
    
    
    return(
        <>
            <StyledButton className='my-2 float-right' variant='dark' size='sm' onClick={handleToggle}>+ Add Product</StyledButton>
            <Modal show={show} onHide={handleToggle}>
                <Modal.Header closeButton >
                    {id ? 'Edit' : 'Add'} Product
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            Brand
                            <Form.Control type="text"name='brand' value={product?.brand} onChange={handleChange} isInvalid={errors.brand} required/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            Description
                            <Form.Control type="text" name='description' value={product?.description}  onChange={handleChange} isInvalid={errors.description} required/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            Price
                            <Form.Control type="number" name='price' value={product?.price}  onChange={handleChange} isInvalid={errors.price} required/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            Stock
                            <Form.Control type="number" name='stock' value={product?.stock} onChange={handleChange} isInvalid={errors.stock} required/>
                        </Form.Group>
                        <div className='d-flex justify-content-between py-2'>
                            <Button variant='outline-dark' onClick={handleToggle}>Back</Button>
                            <div className='flex-shrink-0'>
                                <Button variant='primary' className='mr-2' type='submit'>{id ? 'Edit' : 'Save' }</Button>
                                <Button variant='danger' onClick={()=>handleDelete(id)}>Delete</Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastMessage message={toastMessage} close={setToastMessage} />
        </>
    )
}

const StyledButton = styled(Button)`
    width: 150px;
    height: 40px;
`

export default ProductDetails