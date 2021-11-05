const express = require('express')

const app = express()
const port = 80

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log('CSP is running'))