import axios from 'axios';

const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token
console.log(token)
axios.defaults.headers['Authorization'] = token ?? ''
