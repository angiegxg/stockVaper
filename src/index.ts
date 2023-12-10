import express from 'express'
import cors from 'cors'
import flavorRoutes from './routes/flavorRoute'
import productRoutes from './routes/productRoute'
import sellerRoutes from './routes/sellerRoute'
import stockRoutes from './routes/stockRoute'
import saleRoutes from './routes/saleRoute'
import distributionRoutes from './routes/distributionRoute'
import userRoutes from './routes/userRoute'

const app = express()
app.use(express.json())
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.options('*', cors())

const PORT = process.env.PORT || 3001

app.use('/flavor', flavorRoutes)
app.use('/product', productRoutes)
app.use('/seller', sellerRoutes)
app.use('/stock', stockRoutes)
app.use('/sale', saleRoutes)
app.use('/distribution', distributionRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
