import React, { useEffect } from 'react'
import styled from 'styled-components'

const ToastMessage = ({message, close})=>{
    
    useEffect(()=>{
        if(message) 
            setTimeout(()=>close(''),5000) 
    },[message])
    
    return(
        <Div 
            className='bg-light p-3 rounded shadow position-absolute'  
            style={{display: message ? 'inline' : 'none'}}
        >
            {message}
        </Div>
    )
}

const Div = styled.div`
    top: 10px;
    right:10px;
`

export default ToastMessage