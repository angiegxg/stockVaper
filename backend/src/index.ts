import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.options('*', cors())

const PORT = 3001

app.get('/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here!!!')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
