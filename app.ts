import express from 'express'
import { router } from './routes/todo.route'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(cors())
app.use('/api',router)

app.listen(3004,() => console.log('Server started, port: 3004'))