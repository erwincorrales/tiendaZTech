// customers CRUD
const express = require('express');
const Router = express.Router();

const db = require('../database/db');
const {authMiddleware} = require('../jwt/jwt')

Router.get('/api/customers', authMiddleware, async (_,res)=>{
    try {
        const response = await db.consulta('SELECT * from customers')
        return res.json({customers: response})
    } catch (error) {
        return res.json({error})
    }
});

Router.get('/api/customers/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params;
    try {
        const customer = await db.consulta(`SELECT * from customers WHERE nit=${id}`)
        return res.json({customer:customer[0]})
    } catch (error) {
        return res.json(error)
    }
})

Router.post('/api/customers', authMiddleware, async(req,res)=>{
    const customer = req.body;
    const data = `${customer.nit}, '${customer.name}', '${customer.addr}', '${customer.phone}', '${customer.email}'`
    try {
        const response = await db.consulta(`INSERT INTO customers VALUES (${data})`)
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
})

Router.patch('/api/customers', authMiddleware, async(req,res)=>{
    const customer = req.body
    if (!customer?.nit) {
        console.log('error')
        return res.json({error: 'nit Undefined!'})
    }

    const {nit, name, addr, phone, email} = customer
    try {
        let response = await db.consulta(`UPDATE customers SET addr = '${addr}', name = '${name}', email = '${email}', phone=${phone} WHERE nit = ${nit}`)
        response = await db.consulta(`SELECT * from customers WHERE nit= ${nit} `)
        return res.json({customer:response[0]})
    } catch (error) {
        return res.json(error)
    }
})

Router.delete('/api/customers/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params
    try {
        const response = await db.consulta(`DELETE FROM customers WHERE nit = ${id}`)
        return res.json(response)
    } catch (error) {
        res.json(error)
    }
})

module.exports = Router