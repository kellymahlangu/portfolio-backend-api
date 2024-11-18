import express from 'express'

const PORT = process.env.PORT || 3001
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to My Portfolio Page!!')
})

app.get('/hello', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})

// module.exports = app