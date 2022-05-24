import React, {useRef, useState} from 'react'
import { Card, Container, Button, FormControl } from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import authService from '../services/auth'

const Login = () =>{
    const [ errors, setErrors ] = useState({username: false, password: false})
    const history = useHistory()
    const userInput = useRef()
    const passwordInput = useRef()
    
    const validate = () =>{
        if(!userInput.current.value || !passwordInput.current.value) return false
        return true
    }
    
    const handleSubmit = async ()=>{
        if (validate()){
            const credentials = { 
                username: userInput.current.value, password: passwordInput.current.value
            }
            const res = await authService.authenticate(credentials)
            if(!res.error) {
                sessionStorage.setItem('e1TiendaToken', JSON.stringify(res))
                history.push('/main');
            }
        }else
            setErrors({username: true, password: true})
    }

    return(
        <Container fluid className='d-flex flex-column bg-success justify-content-center align-items-center vh-100'>
           <LoginContainer className='m-0 rounded w-50 text-center shadow border-dark'>
               <Card.Header className='mx-0 bg-dark text-white'>
                   <h2>e1max Tienda</h2>
               </Card.Header>
               <Card.Body>
                   <FormControl className='mt-2' placeholder ='username' ref={userInput} type='email' required isInvalid={errors.username}/>
                   <FormControl className='mt-2 mb-3' placeholder ='password' ref={passwordInput} required  isInvalid={errors.password}/>
                   <Button onClick={handleSubmit} variant='dark'>LOGIN</Button>
               </Card.Body>
           </LoginContainer>
           <p className='mt-3'>user: Zabud  pass: 1234 </p>
        </Container>
    )
    
}

//style
const LoginContainer = styled(Card)`
    max-width: 400px;
    background-color: rgba(0,0,0,.2);
`

export default Login