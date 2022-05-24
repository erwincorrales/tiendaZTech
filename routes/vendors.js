// users CRUD
const express = require('express');
const Router = express.Router();

const db = require('../database/db');
const { authMiddleware } = require('./../jwt/jwt')

Router.get('/api/vendors', authMiddleware, async (_,res)=>{
    try {
        const response = await db.consulta('SELECT * from vendors')
        return res.json({vendors: response})
    } catch (error) {
        return res.json({error})
    }
});

Router.get('/api/vendors/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params;
    try {
        const vendor = await db.consulta(`SELECT * from vendors WHERE nit=${id}`)
        return res.json({vendor:vendor[0]})
    } catch (error) {
        return res.json(error)
    }
})

Router.post('/api/vendors', authMiddleware, async(req,res)=>{
    const user = req.body;
    const data = `${user.nit}, '${user.name}', '${user.addr}', '${user.phone}', '${user.email}'`
    try {
        const response = await db.consulta(`INSERT INTO vendors VALUES (${data})`)
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
})

Router.patch('/api/vendors', authMiddleware, async(req,res)=>{
    const user = req.body
    if (!user?.nit) return res.json({error: 'nit Undefined!'})

    const {nit, name, addr, phone, email} = user
    try {
        let response = await db.consulta(`UPDATE vendors SET addr = '${addr}', name = '${name}', email = '${email}', phone=${phone} WHERE nit = ${nit}`)
        response = await db.consulta(`SELECT * from vendors WHERE nit= ${nit} `)
        return res.json({user:response[0]})
    } catch (error) {
        return res.json(error)
    }
})

Router.delete('/api/vendors/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params
    try {
        const response = await db.consulta(`DELETE FROM vendors WHERE nit = ${id}`)
        return res.json(response)
    } catch (error) {
        res.json(error)
    }
})

module.exports = Router