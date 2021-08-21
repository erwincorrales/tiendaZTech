const express = require('express')
const Router = express.Router()

const db = require('../database/db');
const {authMiddleware} = require('../jwt/jwt')

Router.get(`/api/invoices`, authMiddleware, async(req,res)=>{
    try {
        const response = await db.consulta('SELECT id, userId, name, arrayItems, date, amount FROM invoices INNER JOIN customers ON invoices.userId = customers.nit')
        return res.json({invoices: response})
    } catch (error) {
        return res.json({error})
    }
})

Router.get(`/api/invoices/:id`, authMiddleware, async(req,res)=>{
    const {id} = req.params
    try {
        const response = await db.consulta(`SELECT * FROM invoices WHERE id = ${id}`)
        return res.json({invoice: response})
    } catch (error) {
        return res.json({error})
    }
})

Router.post(`/api/invoices`, authMiddleware, async(req,res)=>{
    const invoice = req.body
    try {
        const response = await db.consulta(`INSERT INTO invoices VALUES (null, '${invoice.userId}', '${invoice.arrayItems}', '${invoice.date}', ${invoice.amount} )`)
        return res.json(response)
    } catch (error) {
        return res.json({error})
    }
})

Router.patch(`/api/invoices`, authMiddleware, async(req,res)=>{
    const invoice = req.body
    try {
        const response = await db.consulta(`UPDATE invoices SET  userId='${invoice.userId}', arraysItems='${invoice.arrayItems}', date='${invoice.date}', amount=${invoice.amount} )`)
        return res.json(response)
    } catch (error) {
        return res.json({error})
    }
})

Router.delete(`/api/invoices/:id`, authMiddleware, async(req,res)=>{
    const {id} = req.params
    try {
        const response = await db.consulta(`DELETE FROM invoices WHERE id = ${id}`)
        return res.json(response)
    } catch (error) {
        return({error})
    }
})

module.exports = Router