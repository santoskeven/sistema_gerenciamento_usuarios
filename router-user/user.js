const express = require('express')
const router = express.Router()
const pool = require('../db/db')

router.use(express.urlencoded({
    extended: true,
}))

router.use(express.json())

router.get('/', (req, res) => {

    res.render('home')

})

//ROTA PARA REDIRECIONAR PARA FORM PARA ADICIONAR NOVO USUÁRIO
router.get('/add-user', (req, res) => {

    res.render('newUser')

})


//POST PARA ADICIONAR UM NOVO USUÁRIO
router.post('/add-user', (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const idade = req.body.idade;
    const mae = req.body.mae

    const query = "INSERT INTO users_full (??, ??, ??, ??) VALUES (?, ?, ?, ?)"
    const data = ['nome', 'email', 'idade', 'mae', nome, email, idade, mae]

    pool.query(query, data, (err) => {
        if(err){console.log(err)}
        res.redirect('list')
    })
 
})


//ROTA PARA EDITAR UM USUÁRIO ESPECIFICO 
router.get('/edit-user/:id', (req, res) => {
    
    const id = req.params.id

    const query = "SELECT * FROM users_full WHERE ?? = ?"
    const data = ['id', id]

    pool.query(query, data, (err,data) => {

        if(err){console.log(err)}

        const user = data[0]

        res.render('editUser', {user})

    })

})


//POST PARA FAZER UPDATE NOS DADOS DO USUÁRIO
router.post('/update-user', (req, res) => {

    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const idade = req.body.idade;
    const mae = req.body.mae;

    const query = "UPDATE users_full SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?"
    const data = ['nome', nome, 'email', email, 'idade', idade, 'mae', mae, 'id', id ]

    pool.query(query, data, (err) => {

        if(err){console.log(err)}

        res.redirect('/user/list')

    })

})


router.post('/delete-user/:id', (req, res) => {
    
    const id = req.params.id

    const query = "DELETE FROM users_full WHERE ?? = ?"
    const data = ['id', id]

    pool.query(query, data, (err) => {

        if(err){console.log(err)}

        res.redirect('/user/list')

    })

})

router.get('/list', (req, res) => {

    const query = "SELECT * FROM users_full"

    pool.query(query, (err, data) => {

        if(err){console.log(err)}

        const users = data

        res.render('userList', {users})

    })

})

module.exports = router