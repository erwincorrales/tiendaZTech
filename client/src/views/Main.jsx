import React, { useLayoutEffect } from 'react'
import { Container } from 'react-bootstrap'
import NavbarHeader from '../components/MainHeader/MainHeader'
import { Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios'

import ProductDashboard from './ProductsDashboard'
import CustomerDashboard from './CustomerDashboard'
import VendorDashboard from './VendorDashboard'
import InvoiceDashboard from './InvoiceDashboard'
import NotFound from './NotFound'

const Main = () => {
    const history = useHistory()

    useLayoutEffect(()=>{
        const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token
        if(token){
            console.log(token)
            axios.defaults.headers['Authorization'] = token 
        }
        else
            history.push('/login')
    },[])

    return(
        <Container fluid className='bg-dark vh-100 m-0 p-0'>
            <NavbarHeader/>
            <Container fluid className='m-0'>
                <Switch>
                    <Route exact path='/main' component={ProductDashboard}/>
                    <Route exact path='/main/customers' component={CustomerDashboard}/>
                    <Route exact path='/main/vendors'   component={VendorDashboard}/>
                    <Route exact path='/main/invoices' component={InvoiceDashboard}/>
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Container>
    )
}

export default Main