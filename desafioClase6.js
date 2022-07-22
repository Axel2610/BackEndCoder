const express = require('express');
const Contenedor = require('./contenedor');

const app = express();
const PORT = 8080;
const contenedor = new Contenedor('./productos.txt');

app.get('/productos',(async(req,res)=>{
    let productos = await contenedor.getAll();
    let productosString = JSON.stringify(productos)
    await res.send(productosString)
}))


app.get('/productoRandom', (async(req,res)=>{
    let idRandom = Math.ceil(Math.random()*3)
    let productoRandom = await contenedor.getById(idRandom)
    let productoString = JSON.stringify(productoRandom)
    await res.send(productoString)
}))


const server = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})
server.on('error', err => console.log(err))
