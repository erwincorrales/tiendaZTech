import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const Product = ({item:{id, brand, description, price, stock }, toCart, setId}) =>{

    const currencyPrice = (price) =>{
        const value = new Intl.NumberFormat({style:'currency'}).format(price)
        return value
    }

    return(
        <Div className='shadow py-2 px-3 m-2 bg-warning rounded text-center'>
            <Title onClick={()=>toCart(id)}>
                <div className='d-flex justify-content-between'>
                    <p className='small m-0'>{brand}</p>
                    <div className='ml-3 mb-3 small'>id: {id}</div>
                </div>
                <h5 className='m-0'>{description}</h5>
                <h6>${currencyPrice(price)}</h6>
            </Title>
           <div className='d-flex justify-content-between align-items-center ' style={{fontSize: 12}}>
                <Button 
                    size='sm' variant='link'><i className='small'
                    onClick={()=>setId(id)}
                >edit</i></Button>
                <div>stock: {stock}</div>
           </div>
        </Div>
    )
}

const Div = styled.div`
    width: 180px;
    max-height: fit-content;
`

const Title = styled.div`
    cursor: pointer
`

export default Product