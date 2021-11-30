const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log('Local root called!')
    res.redirect('/info.html')
})

app.get('/test', (req, res) => {
    console.log("Test called!")
    res.send('Test succeeded')
})

app.get('/data', (req, res) => {
    let exampleData = {
        name: "Sam",
        age: 32
    }
    res.send(exampleData)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})