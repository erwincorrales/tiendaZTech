import React, { useEffect, useCallback, useState } from 'react'
import { Container } from 'react-bootstrap'
import Product from '../components/Products/Product'
import productService from '../services/product';
import ProductDetails from '../components/Products/ProductDetails';
import Toast from '../components/common/Toast';
import Cart from './../components/Products/Cart'

const ProductDashboard = () =>{
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(0)
    const [toastMessage, setToastMessage] = useState('')
    const [refreshProducts, setRefreshProducts] = useState(false)
    
    //cart logic
    const [cartItems, setCartItems] = useState([])
    
    const insertProductToCart = id =>{
        let item = products?.filter(item=>item.id === id)[0]
        let i = {...item}
        delete i.stock
        setCartItems([...cartItems, i])
    }
        
    const removeCartItems = () => setCartItems([])

    useEffect(()=>{
        const fetchProducts = async()=>{
            const res = await productService.getProducts()
            if(!res.error){
                setProducts(res.products)
            }
            else
                setToastMessage(res.error)
        }
        fetchProducts()
    },[refreshProducts])

    return(
        <Container fluid className='d-flex flex-column position-relative m-0 p-0 pt-5 vh-100 w-100'>
            <ProductDetails id={id} setId={setId} productListRefresh={()=>setRefreshProducts(!refreshProducts)}/>
            <div className='m-0 p-0 px-3  overflow-auto d-flex flex-wrap align-content-start align-items-center flex-fill' >
                    {
                        products?.map((item, key) =>(
                            <Product item={item} key={key} setId={setId} toCart={insertProductToCart}/>
                            ))
                    }
            </div>
            <Toast message={toastMessage} close={setToastMessage}/>
            <Cart products={products} cartItems={cartItems} removeCartItem = {removeCartItems}/>
        </Container>
    )
}

export default ProductDashboard
