import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())
const port = Number(process.env.PORT) || 3003

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})

app.get("/test", (req, res) => {
    res.send("Hello world!!")
})