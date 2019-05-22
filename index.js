const express = require('express')
const path = require("path")
const app = express()
const port = 3000

app.use(express.static('public'))
app.get('/', (req, res) => {
    // res.sendFile('./public/metamask/index.html');
    res.sendFile(path.join(__dirname,'./index.html'));
})

app.get('/metamask', (req, res) => {
    // res.sendFile('./public/metamask/index.html');
    res.sendFile(path.join(__dirname,'public/metamask/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))