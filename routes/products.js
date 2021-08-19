// product CRUD
const express = require('express');
const Router = express.Router();

const db = require('../database/db');
const { authMiddleware } = require('./../auth/jwt')

Router.get('/api/products', authMiddleware, async (_,res)=>{
    try {
        const response = await db.consulta('SELECT * from products')
        return res.json({products: response})
    } catch (error) {
        return res.json({error})
    }
});

Router.get('/api/product/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await db.consulta(`SELECT * from products WHERE id=${id}`)
        return res.json({product:product[0]})
    } catch (error) {
        return res.json({error})
    }
})

Router.post('/api/product', authMiddleware, async(req,res)=>{
    const product = req.body;
    const data = `null, '${product.brand}', '${product.description}', '${product.price}', '${product.stock}'`
    try {
        const response = await db.consulta(`INSERT INTO products VALUES (${data})`)
        return res.json(response)
    } catch (error) {
        return res.json({error})
    }
})

Router.patch('/api/product', authMiddleware, async(req,res)=>{
    const product = req.body
    if (!product?.id) {
        return res.json({error: 'id Undefined!'})
    }

    const {id, brand, description, price, stock} = product
    try {
        let response = await db.consulta(`UPDATE products SET id = '${id}', brand = '${brand}', description = '${description}', price=${price}, stock=${stock} WHERE id = ${id}`)
        response = await db.consulta(`SELECT * from products WHERE id= ${id} `)
        return res.json({product:response[0]})
    } catch (error) {
        return res.json(error)
    }
})

Router.delete('/api/product/:id', authMiddleware, async(req,res)=>{
    const {id} = req.params
    try {
        const response = await db.consulta(`DELETE FROM products WHERE id = ${id}`)
        return res.json(response)
    } catch (error) {
        res.json(error)
    }
})

module.exports = Router