const mysql = require('mysql')
const router = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meusprojetos'
})

module.exports = router;