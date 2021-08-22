import axios from 'axios';
const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token
axios.defaults.headers['Authorization'] = token 
console.log(token)
