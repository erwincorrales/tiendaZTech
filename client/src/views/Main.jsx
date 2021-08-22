import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import NavbarHeader from '../components/MainHeader/MainHeader'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
// import '../services/axiosInterceptor'

import ProductDashboard from './ProductsDashboard'
import CustomerDashboard from './CustomerDashboard'
import VendorDashboard from './VendorDashboard'
import InvoiceDashboard from './InvoiceDashboard'
import NotFound from './NotFound'

const Main = () =>{
    useEffect(()=>{
        const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token
        axios.defaults.headers['Authorization'] = token 
        console.log(token)
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