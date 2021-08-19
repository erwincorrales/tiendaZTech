const express = require('express')
const Router = express.Router()

// const db = require('./../database/db');
const { createToken } = require('./../auth/jwt');

Router.post('/login', (req,res)=>{
    const { user, password } = req.body
    if(!user) return res.json({error: 'Insert user'})
    if(!password) return res.json({error: 'Insert password'})

    if(user === 'zabud' && password === '1234'){
        const clerk = {name: 'Zabud Clerk 1'}
        
        try{
            const token = createToken(clerk)
            return res.status(200).json( {token, clerk})
        }catch(error){
            return res.status(500).json({error})
        }
    }else
        return res.status(401).json({error: 'Invalid Credentials'})
});

module.exports = Router