const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')

const app = express()
app.set('PORT', process.env.PORT || 3000)
const dbOptions = {
    host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
    user: "bsale_test",
    password: "bsale_test",
    database: "bsale_test"
}

// Middlewares
app.use(cors({
    origin: "*"
}))

app.use(myconn(mysql, dbOptions, 'single'))

app.use(express.json())

app.use('/api', routes)

app.listen(app.get('PORT'), () => console.log('Servidor corriendo en puerto', app.get('PORT')))