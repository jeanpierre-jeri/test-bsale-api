const express = require('express')
const routes = express.Router()

routes.get('/', (req,res) => {
    req.getConnection((err, conn) => {
        if (err) throw err

        conn.query("SELECT p.id, p.name, url_image, price, discount, c.name as category FROM product p INNER JOIN category c ON p.category = c.id ORDER BY category", (err, result) => {
            if (err) throw err

            res.json(result)
        })
    })
})

routes.post('/', (req,res) => {
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