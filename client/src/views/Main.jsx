import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from '../components/MainHeader/MainHeader'
import { Switch, Route } from 'react-router-dom'
import './../services/interceptor'

import ProductDashboard from './ProductsDashboard'
import CustomerDashboard from './CustomerDashboard'
import VendorDashboard from './VendorDashboard'
import NotFound from './NotFound'

const Main = () =>{
    return(
        <Container fluid className='bg-dark vh-100 m-0 p-0'>
            <Navbar/>
            <Container fluid >
                <Switch>
                    <Route exact path='/main' component={ProductDashboard}/>
                    <Route exact path='/main/customers' component={CustomerDashboard}/>
                    <Route exact path='/main/vendors' component={VendorDashboard}/>
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Container>

    )
}

export default Main