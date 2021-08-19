const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'e1max.co',
    user: 'zabudTiendaHost',
    password: 'zabud$Tech10',
    database: 'zabudTiendaTest'
})

conn.connect( err=>{
    if(err) return console.log(err)
    console.log('Connected to e1max Server db!')
})

conn.consulta = (sql, values) => {
    return new Promise ((resolve, reject)=>{
        conn.query(sql, values, (err, result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = conn