import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const NotFound = () =>{
    const history = useHistory()
    return(
        <div className='w-100 vh-100 d-flex align-items-center justify-content-center text-center bg-dark'>
            <div className='text-white'>
                <h1>404 !</h1>
                <h4 className='mb-4'>NOT FOUND</h4>
                <Button size='sm' onClick = {()=>history.replace('/main/products')}>Back to Main</Button>
            </div>
        </div>
    )
}

export default NotFound