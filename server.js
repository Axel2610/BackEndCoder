const { Router } = require("express");
const express = require('express');
const Contenedor = require("./contenedor");
const app = express();
const routerProductos = Router();
const bodyParser = require('body-parser');

const contenedor = new Contenedor('./productos.txt')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended: true}))

routerProductos.get('/', async(req,res)=>{
    try {
        const productos = await contenedor.getAll()
        await res.send(productos)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/cargaProducto', (req,res)=>{
    try {
       res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const idProducto = Number(id)
        let productoRandom = await contenedor.getById(idProducto)
        await res.send(productoRandom)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/',async(req,res)=>{
    try {
        const {nombre, categoria, descripcion, precio} = req.body
        const producto = {nombre,categoria,descripcion,precio}
        await contenedor.save(producto)
        res.json({
            nombre,
            categoria,
            descripcion,
            precio
        })
    } catch (error) {
        console.log(error)
    }
})

routerProductos.put('/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const {nombre, categoria, descripcion, precio} = req.body
        const productoId = Number(id)
        await contenedor.deleteById(productoId)
        producto = {
            nombre,
            categoria,
            descripcion,
            precio,
            id : productoId
        }
        contenedor.savePUT(producto)
        
        res.json({
            mensaje: 'OK',
            producto
        })
    } catch (error) {
        console.log(error)
    }
})


routerProductos.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const productoId = Number(id)
        contenedor.deleteById(productoId)
        res.json({
            mensaje: "Producto borrado",
            id
        })
    } catch (error) {
        console.log(error)
    }
})

app.use('/api/productos', routerProductos)

const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Servidor listo en el puerto ${PORT}`)
})