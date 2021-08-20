import axios from 'axios';

// const setTokenInterceptor = () =>{
    const token = JSON.parse(sessionStorage.getItem('e1TiendaToken'))?.token
    console.log(token)
    axios.defaults.headers['Authorization'] = token ?? null
// }

// setTokenInterceptor()

// export {setTokenInterceptor}



