const express = require("express")


const app = express()

app.use(require('cors')())
app.use(express.json())

app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin')(app)//给函数出入参数app
require('./plugins/db')(app)//给函数出入参数app


app.listen(3000,()=>{
    console.log('http://localhost:3000')
})