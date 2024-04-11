const keys = require('./config/keys')

const express = require('express')
const cors = require('cors')
const pg = require('./config/db')
const authMiddleware = require('./middlewares/auth')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use(authMiddleware)
app.use('/api', cartRoutes)



pg.on('error', () => console.log('Lost PG connection'))


app.get('/', async (req, res) => {
    const data = await pg.query('select * from customers')
    res.status(200).send(data.rows)
})


app.listen(8000, () => {
    console.log("listening on 8000.....")
})