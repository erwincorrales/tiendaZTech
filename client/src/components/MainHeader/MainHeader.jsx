import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import axios from 'axios'

const MainHeader = ()=>{
    const history = useHistory()

    const logout = () =>{
        delete axios.defaults.headers.common["Autorization"]
        sessionStorage.removeItem('e1TiendaToken')
        history.replace('/login')
    }

    return(
        <Navbar collapseOnSelect bg='success' variant='dark' className='px-4 m-0' expand='md' fixed='top' >
            <Navbar.Brand as={Link} to='/main' className='text-white'>e1maxTienda</Navbar.Brand>
                <Navbar.Toggle className='text-white'/>
                <Navbar.Collapse className='justify-content-between' >
                    <Nav>
                        <Nav.Link as={Link} to="/main">Products</Nav.Link>
                        <Nav.Link as={Link} to="/main/customers">Customers</Nav.Link>
                        <Nav.Link as={Link} to="/main/vendors">Vendors</Nav.Link>
                        <Nav.Link as={Link} to="/main/invoices">Invoices</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link ><span onClick={logout}>Logout</span></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default MainHeader