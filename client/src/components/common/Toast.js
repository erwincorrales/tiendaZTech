import React, { useEffect } from 'react'
import styled from 'styled-components'

const ToastMessage = ({message, close})=>{
    
    useEffect(()=>{
        if(message) 
            setTimeout(()=>close(''),5000) 
    },[message])
    
    return(
        <Div 
            className='bg-success  text-white py-2 px-4 rounded shadow position-absolute'  
            style={{display: message ? 'inline' : 'none'}}
        >
            {message}
        </Div>
    )
}

const Div = styled.div`
    bottom: 80px;
    right: 20px;
`

export default ToastMessage