import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const MainHeader = ()=>{
    const history = useHistory()

    const logout = () =>{
        console.log('remove token')
        sessionStorage.removeItem('e1TiendaToken')
        history.replace('/login')
    }

    return(
        <Navbar collapseOnSelect bg='success' variant='dark' className='px-4 m-0' expand='md' fixed='top' >
            <Navbar.Brand href='/main' className='text-white'>e1maxTienda</Navbar.Brand>
                <Navbar.Toggle className='text-white'/>
                <Navbar.Collapse className='justify-content-between' >
                    <Nav>
                        <Nav.Link><span onClick={()=>history.push('/main/products')}>Products</span></Nav.Link>
                        <Nav.Link><span onClick={()=>history.push('/main/customers')}>Customers</span></Nav.Link>
                        <Nav.Link><span onClick={()=>history.push('/main/vendors')}>Vendors</span></Nav.Link>
                        <Nav.Link><span onClick={()=>history.push('/main/invoices')}>Invoices</span></Nav.Link>
                        {/* <Nav.Link href='/main/products'>Products</Nav.Link>
                        <Nav.Link href='/main/customers'>Customers</Nav.Link>
                        <Nav.Link href='/main/vendors'>Vendors</Nav.Link> */}
                    </Nav>
                    <Nav>
                        <Nav.Link ><span onClick={logout}>Logout</span></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default MainHeader