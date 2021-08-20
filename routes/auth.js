const express = require('express')
const Router = express.Router()

// const db = require('./../database/db');
const { createToken } = require('../jwt/jwt');

Router.post('/login', (req,res)=>{
    const { username, password } = req.body
    if(!username) return res.json({error: 'Insert username'})
    if(!password) return res.json({error: 'Insert password'})

    if(username === 'Zabud' && password === '1234'){
        const clerk = {name: 'Erwin Corrales'}
        
        try{
            const token = createToken(clerk)
            return res.json( {...clerk,token})
        }catch(error){
            return res.status(500).json({error})
        }
    }else
        return res.json({error: 'Invalid Credentials'})
});

module.exports = Router