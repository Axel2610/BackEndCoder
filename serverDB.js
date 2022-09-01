const { Router } = require('express');
const express = require('express');

const {Server: ServerHTTP} = require('http')
const {Server: IOServer} = require('socket.io');
const ContenedorDB = require('./contenedorDB');
const ContenedorMSJ = require('./contenedorMsjSQLITE');

const app = express();
const serverHttp = new ServerHTTP(app)
const io = new IOServer(serverHttp)


const contenedor = new ContenedorDB()
const contenedorMensajes = new ContenedorMSJ()
const routerProductos = Router();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('views','./public/views')
app.set('view engine','ejs')


routerProductos.get('/',async(req,res)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error)
    }
})



io.on('connection', async(socket) =>{
    socket.on('producto-nuevo', async(producto)=>{
        await contenedor.save(producto)
        const listadoProductos = await contenedor.getAll()
        io.sockets.emit('lista-prod',listadoProductos)
    })

    const listadoProductos = await contenedor.getAll()
    io.sockets.emit('connected', listadoProductos)

    //  CHAT

    socket.on('mensaje-chat', async(mensaje)=>{
        await contenedorMensajes.save(mensaje)
        const listaMensajes = await contenedorMensajes.getAll()
        io.sockets.emit('lista-mensajes', listaMensajes )
    })
    const listaMensajes = await contenedorMensajes.getAll()
    io.sockets.emit('conexion', listaMensajes)
})


app.use('/api', routerProductos)

const PORT = 8080
serverHttp.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})