import React from 'react'
import { Modal } from 'react-bootstrap'

const InvoiceItemsList = ({products, invoiceSelected, close}) =>{
    
    const getItems = () =>{
        console.log(invoiceSelected.arrayItems)
        // let itemsJson = JSON.parse(invoiceSelected.arrayItems) ?? []
        // console.log(itemsJson)
        // return itemsJson
        return []
    } 
    
    return(
        <Modal show = {invoiceSelected?.id} onHide={close} centered>
            <Modal.Header closeButton>
                ITEMS
            </Modal.Header>
            <Modal.Body>
                {
                    getItems().map((item,key)=>(
                        <div key={key}> {item?.id} </div>
                    ) )
                }
            </Modal.Body>
        </Modal>
    )
}

export default InvoiceItemsList

