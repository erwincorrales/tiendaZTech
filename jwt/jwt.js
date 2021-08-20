//TOKEN LIBRARY 

const jwt = require('jsonwebtoken');
const privateKey = 'z$buDS3cr3t';

const predefinedUser = {
    nit: '1234',
    name: 'test',
    email: 'test@zabud.com',
  }

const createToken = (payload = predefinedUser) =>{
    const token = jwt.sign(
        payload, 
        privateKey, 
        // {expiresIn: '12h'} 
    );
    return token;
}

const verifyToken = tkn =>{
    try {
        const token = jwt.verify(tkn, privateKey);
        return {token}
    } catch (error) {
        return {error: error.message}
    }
}

const authMiddleware = (req, res, next)=>{
    const header = req.headers['authorization']
    const token = header?.replace('Bearer ', '') 
    if(!token) return res.status(401).json({error: 'Token undefined'})
    jwt.verify(token, process.env.SECRET || privateKey, (err, user)=>{
        if(err) return res.status(403).json({message: "Not Authorized"})
        req.user = user
        next()
    })
}

module.exports = { createToken, verifyToken, authMiddleware }