const express = require('express');
const app = express();

const { Router } = require("express");
const routerProductos = Router();

const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt')

const handlebars = require('express-handlebars')

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views',
    partilsDir: __dirname + '/views/partials'
})
)

app.set('view engine','hbs')
app.set('views','./views')



routerProductos.get('/', async(req,res)=>{
    try {
        res.sendFile(__dirname + '/views/form.html')
    } catch (error) {
        console.log(error)
    }
})


routerProductos.post('/',async(req,res)=>{
    try {
        const {nombre, categoria, descripcion, precio, img} = req.body
        const producto = {nombre,categoria,descripcion,precio, img}
        await contenedor.save(producto)
        res.sendFile(__dirname + '/views/form.html')
    } catch (error) {
        console.log(error)
    }
})


routerProductos.get('/productos',async(req,res)=>{
    try {
        const listaProd = await contenedor.getAll()
        res.render('index',{lista: listaProd})
    } catch (error) {
        console.log(error)
    }
})

app.use('/api', routerProductos)

const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Servidor listo en el puerto ${PORT}`)
})
    
    
    
    
    
    
    
    
    
    
    
    
    // routerProductos.get('/:id', async(req,res)=>{
    //     try {
    //         const {id} = req.params
    //         const idNumber = Number(id)
    //         res.send(await contenedor.getById(idNumber))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    // routerProductos.put('/:id', async(req,res)=>{
    //     try {
    //         const {id} = req.params
    //         const {nombre, categoria, descripcion, precio} = req.body
    //         await contenedor.deleteById(id)
    //         const producto = {
    //             nombre,
    //             categoria,
    //             descripcion,
    //             precio,
    //             id: id
    //         }
    //         await contenedor.savePUT(producto)
            
    //         res.json({
    //             mensaje: 'OK',
    //             producto
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    
    
    // routerProductos.delete('/:id', async(req,res)=>{
    //     try {
    //         const {id} = req.params
    //         await contenedor.deleteById(id)
    //         res.json({
    //             mensaje: "Producto borrado",
    //             id
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })