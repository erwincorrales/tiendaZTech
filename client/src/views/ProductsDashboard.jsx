import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Product from '../components/Products/Product'
import productService from '../services/productService';
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
    const insertProductToCart = (id)=>{
        const items = products?.filter(item=>item.id === id)[0]
        setCartItems([...cartItems, items])
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
        <Container fluid className='d-flex flex-column position-relative m-0 p-0' style={{height: 'calc(100vh - 80px'}} >
            <ProductDetails id={id} setId={setId} productListRefresh={()=>setRefreshProducts(!refreshProducts)}/>
            <div className=' m-0 p-0 py-3 overflow-auto flex-fill d-flex flex-wrap align-content-start align-items-center' >
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
