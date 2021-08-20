import React, { useEffect, useState } from 'react'
import { Container, Accordion } from 'react-bootstrap'
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
    const insertProductToCart = (id)=>{
        // const index = cartItems.findIndex((element=>element.id === id))
        // if(index > -1)  
        //     setCartItems([...setCartItems, {id:cartItems[index].id, cant: cartItems[index].cant + 1, price: cardItems[index].price}]) 
        // else{
        //     setCartItems([...setCartItems, {id: cartItems[index].id, cant:1, price: cartItems[index].price}]) 
            const items = products?.filter(item=>item.id === id)[0]
            setCartItems([...cartItems, {id:items?.id, price: items?.price}])
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
        <Container fluid className='d-flex flex-column position-relative m-0 p-0 pt-5 vh-100'>
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
