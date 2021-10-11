const express = require('express')
const routes = express.Router()

routes.get('/', (req,res) => {
    res.send('Bienvenido a mi API de productos, para usarla entra a /api')
})

routes.get('/api', (req,res) => {
    req.getConnection((err, conn) => {
        if (err) throw err

        conn.query("SELECT p.id, p.name, url_image, price, discount, c.name as category FROM product p INNER JOIN category c ON p.category = c.id ORDER BY category", (err, result) => {
            if (err) throw err

            res.json(result)
        })
    })
})

routes.post('/api', (req,res) => {
    req.getConnection((err, conn) => {
        if (err) throw err
        
        let search = req.body.search
        let value = `%${search}%`
        
        conn.query("SELECT p.id, p.name, url_image, price, discount, c.name as category FROM product p INNER JOIN category c ON p.category = c.id WHERE p.name LIKE ? ORDER BY category", [value], (err, result) => {
            if (err) throw err

            res.json(result)
        })
    })
})

module.exports = routes