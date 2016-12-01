"use_strict"

const express = require("express")
const bodyparser = require("body-parser")

const app = express()
app.use(bodyparser.json())
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended: true}))

app.get("/", function(request, response) {
    response.sendFile('index.html')
})

app.post("/auth", function(request, response) {
    var salario = request.body.salario
    var result = salario - 100
    response.send("Valor recebido: " + result)    
})



//Servidor
const server = app.listen(3000)
console.log("Servidor iniciado na porta: " + server.address().port)