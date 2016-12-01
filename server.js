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
    var descontoINSS = calcINSS(salario)
    var salarioDescontado = descSalario(salario, descontoINSS)
    var impostoDeRenda = calcIRPF(salarioDescontado)
    var salarioLiquido = descSalario(salarioDescontado, impostoDeRenda)
    response.send("Valor recebido: " + salario + " INSS: " + descontoINSS.toFixed(2) + " IRPF: " + impostoDeRenda.toFixed(2) + " Salario Liquido: " +salarioLiquido.toFixed(2))    
})

function calcINSS(salario) {
    var alicota = 0
    if(salario <= 1399.12) alicota = 0.08
    else if(salario > 1399.12 & salario <=2331.88) alicota = 0.09
    else if(salario > 2331.88 & salario <=4663.75) alicota = 0.11
    else return salario - 513.02
    
    return salario * alicota
}

function descSalario(salario, desconto) {
    return salario - desconto
}

function calcIRPF(salarioDescontado) {
    var alicota = 0
    var deducao = 0
    
    if(salarioDescontado > 1903.98 & salarioDescontado <= 2826.65){
        alicota = 0.075
        deducao = 142.80
    }
    else if(salarioDescontado > 2826.65 & salarioDescontado <= 3751.05){
        alicota = 0.15
        deducao = 354.80
    }
    else if(salarioDescontado > 3751.05 & salarioDescontado <= 4664.68){
        alicota = 0.225
        deducao = 636.13
    }
    else if(salarioDescontado > 4664.68){
        alicota = 0.275
        deducao = 869.36
    }
    
    return (salarioDescontado * alicota) - deducao
}


//Servidor
const server = app.listen(3000)
console.log("Servidor iniciado na porta: " + server.address().port)