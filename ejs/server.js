const { Router } = require('express');
const express = require('express');
const app = express();
const routerProductos = Router();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('views','./views')
app.set('view engine','ejs')

routerProductos.get('/',(req,res)=>{
    try {
        res.sendFile(__dirname + '/views/form.html')
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/',async(req,res)=>{
    try {
        const {nombre, categoria, descripcion, precio, img} = req.body
        const producto = {nombre, categoria, descripcion, precio, img}
        await contenedor.save(producto)
        res.sendFile(__dirname + '/views/form.html')
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/productos',async(req,res)=>{
    try {
        const listaProd = await contenedor.getAll()
        res.render('index', {listaProd})
    } catch (error) {
        console.log(error)
    }
})

app.use('/api', routerProductos)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})