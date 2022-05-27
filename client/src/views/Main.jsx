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
        if(token) axios.defaults.headers['Authorization'] = token 
        else history.push('/login')
    },[])

    return(
        <Container fluid className='bg-dark vh-100 m-0 p-0'>
            <NavbarHeader/>
            <Container fluid className='m-0 p-0 px-3'>
                <Switch>
                    <Route exact path='/main' component={ProductDashboard}/>
                    <Route path='/main/customers' component={CustomerDashboard}/>
                    <Route path='/main/vendors'   component={VendorDashboard}/>
                    <Route path='/main/invoices' component={InvoiceDashboard}/>
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Container>
    )
}

export default Main