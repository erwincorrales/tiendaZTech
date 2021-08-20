import React from 'react'
import { Container } from 'react-bootstrap'
import NavbarHeader from '../components/MainHeader/MainHeader'
import { Switch, Route } from 'react-router-dom'
import '../services/axiosInterceptor'

import ProductDashboard from './ProductsDashboard'
import CustomerDashboard from './CustomerDashboard'
import VendorDashboard from './VendorDashboard'
import InvoiceDashboard from './InvoiceDashboard'
import NotFound from './NotFound'

const Main = () =>{
    return(
        <Container fluid className='bg-dark vh-100 m-0 p-0'>
            <NavbarHeader/>
            <Container fluid>
                <Switch>
                    <Route path='/main/products' component={ProductDashboard}/>
                    <Route path='/main/customers' component={CustomerDashboard}/>
                    <Route path='/main/vendors' component={VendorDashboard}/>
                    <Route path='/main/invoices' component={InvoiceDashboard}/>
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Container>
    )
}

export default Main