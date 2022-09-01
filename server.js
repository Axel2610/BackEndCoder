const { Router } = require('express');
const express = require('express');
const app = express();
const routerProductos = Router();
const routerCarrito = Router()

const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt')
const contenedorCarrito = new Contenedor('./carrito.txt')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('views','./views')
app.set('view engine','ejs')

const isAdmin = true

routerProductos.get('/',async(req,res)=>{
    try {
        const listaProd = await contenedor.getAll()
        res.json(listaProd)
    } catch (error) {
        console.log(error)
    }
})

// GET POR ID 
routerProductos.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const idProducto = Number(id)
        let productoRandom = await contenedor.getById(idProducto)
        res.json(productoRandom)
    } catch (error) {
        console.log(error)
    }
})


routerProductos.post('/',async(req,res)=>{
    if(isAdmin){
        try {
            const {nombre, descripcion, precio, img, stock} = req.body
            const timestamp = Date.now()
            const codigo = `${nombre}--${timestamp}`
            const producto = {nombre, descripcion, precio, img, timestamp, stock, codigo}
            await contenedor.save(producto)
            const listaProd = await contenedor.getAll()
            res.json(listaProd)
        } catch (error) {
            console.log(error)
        }
    }else{
       console.log('Error ruta no autorizada')
       res.send('Ruta no autorizada')
    }
})



routerProductos.put('/:id', async(req,res)=>{
    if(isAdmin){

    try {
        const {id} = req.params
        const {nombre, descripcion, precio, img, stock } = req.body
        const timestamp = Date.now()
        const codigo = `${nombre}--${timestamp}`
        const productoId = Number(id)
        await contenedor.deleteById(productoId)
        const producto = {
            nombre,
            descripcion,
            precio,
            img,
            timestamp,
            stock,
            codigo,
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
    }else{
        console.log('Error ruta no autorizada')
        res.send('Ruta no autorizada')
    }
})


routerProductos.delete('/:id', async(req,res)=>{
    if(isAdmin){
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
    }else{
        console.log('Error ruta no autorizada')
        res.send('Ruta no autorizada')
    }
})

///////////////////// CARRITO ///////////////////////////////////

routerCarrito.post('/',async(req,res)=>{
    try {
        const timestamp = Date.now()
        const productos = []
        const carrito = {productos, timestamp}
        contenedorCarrito.save(carrito)
        res.json('carrito guardado')
    } catch (error) {
        console.log(error)
    }
})

// borrar todo el carrito
routerCarrito.delete('/:id', async(req,res)=>{
    if(isAdmin){
        try {
            const {id} = req.params
            const productoId = Number(id)
            contenedorCarrito.deleteById(productoId)
            res.json({
                mensaje: 'Carrito eliminado',
                id
            })
        } catch (error) {
            console.log(error)
        }
    }else{
        console.log('Error ruta no autorizada')
        res.send('Ruta no autorizada')
    }
})
// mostrar carrito individual
routerCarrito.get('/:id/productos',async(req,res)=>{
    try {
        const {id} = req.params
        const numberId = Number(id)
        const carrito = await contenedorCarrito.getById(numberId)
        res.json(carrito)
    } catch (error) {
        console.log(error)
    }
})
// insertar producto a carrito //// :id = carrito a seleccionar y :prod = producto a agregar
routerCarrito.post('/:id/:prod/productos', async(req,res)=>{
    if(isAdmin){
        try {
        const {id, prod} = req.params
        const numberId = Number(id)
        const idProd = Number(prod)
        
        const carrito = await contenedorCarrito.getById(numberId)
        const producto = await contenedor.getById(idProd)
        await contenedorCarrito.deleteById(numberId)
        
        carrito.productos.push(producto)
        
        contenedorCarrito.savePUT(carrito)
        res.json(carrito)
    } catch (error) {
        console.log(error)
    }
    }else{
        console.log('Error ruta no autorizada')
        res.send('Ruta no autorizada')
    }
})


routerCarrito.delete('/:id/:idProd', async(req,res)=>{
    if(isAdmin){
        try {
            const {id, idProd} = req.params
            const numId = Number(id)
        const numIdProd = Number(idProd) 
        const carrito = await contenedorCarrito.getById(numId)
        await contenedorCarrito.deleteById(numId)
        carrito.productos[numIdProd - 1] = {};
        await contenedorCarrito.savePUT(carrito)
        res.json({
            mensaje: 'Producto eliminado',
            id: numIdProd
        })

    } catch (error) {
        console.log(error)
    }
    }else{
        console.log('Error ruta no autorizada')
        res.send('Ruta no autorizada')
    }
})




app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.get('*',(req, res)=>{
    const metodo = req.method
    const ruta = req.url
    res.send({"error": -2, "descripcion": `ruta ${ruta}`, "método": `'${metodo}' no implementada`});
})

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})