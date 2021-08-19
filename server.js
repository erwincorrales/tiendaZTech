const express = require('express');
const app = express();
const path = require('path')


app.use(express.urlencoded({extended: false}))
app.use(express.json())

//ui static files
app.use(express.static(path.join(__dirname, 'client', 'build')))

//use Routes
const customersRoutes = require('./routes/customers');
const productsRoutes = require('./routes/products');
const auth = require('./routes/auth');
app.use(customersRoutes);
app.use(productsRoutes);
app.use(auth);

const PORT =  process.env.PORT || 3001
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})