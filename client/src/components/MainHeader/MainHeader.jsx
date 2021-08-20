import React from 'react'
import {Nav, Navbar } from 'react-bootstrap'

const MainHeader = ()=>{
    return(
        <Navbar bg='success' variant='dark' className='px-4 m-0' expand='md' collapseOnSelect>
            <Navbar.Brand href='/main' className='text-white'>Tienda</Navbar.Brand>
                <Navbar.Toggle className='text-white'/>
                <Navbar.Collapse className='justify-content-between' >
                    <Nav>
                        <Nav.Link  href='/main/products'>Products</Nav.Link>
                        <Nav.Link  href='/main/customers'>Customers</Nav.Link>
                        <Nav.Link  href='/main/vendors'>Vendors</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link  href='/logout'>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default MainHeader