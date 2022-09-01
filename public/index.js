const socket = io().connect()


const renderTabla = (productos) =>{
    let tabla = document.querySelector('#tabla')
    let html = productos.map(prod=>{
        return`<tr>
        <td>${prod.nombre}</td>
        <td>${prod.categoria}</td>
        <td>${prod.descripcion}</td>
        <td>${prod.precio}</td>
        <td>${prod.id}</td>
        <td><img src="${prod.img}"height=50></td>
        </tr>`
    })
    tabla.innerHTML = html.join('')
}


const addProduct = (e) =>{
    const nombre = document.querySelector('#nombre').value
    const categoria = document.querySelector('#categoria').value
    const descripcion = document.querySelector('#descripcion').value
    const precio = document.querySelector('#precio').value
    const img = document.querySelector('#imagen').value
    

    const producto = {nombre,categoria,descripcion,precio,img}
    console.log(producto)

    socket.emit('producto-nuevo', producto)

    return false
}




socket.on('connected', productos=>{
    renderTabla(productos)
})

socket.on('lista-prod', productos=>{
    renderTabla(productos)
})



//                 CHAT

const addMensaje = (e) =>{
    const mensaje = document.querySelector('#inputChat').value
    const email = document.querySelector('#inputEmail').value
    const fecha = Date()
    const msjCompleto = {mensaje, email,fecha}

    socket.emit('mensaje-chat', msjCompleto)
    return false
}

const renderMensajes = (msj) =>{
    let listaChat = document.querySelector('#listaChat')
    let html = msj.map(msj=>{
        return `<li>
        <b style="color:blue">${msj.email}</b>
        <span style="color:brown">${msj.fecha}</span> : 
        <span style="color:green; font-style:italic">${msj.mensaje}</span>
        </li>`
    })
    listaChat.innerHTML = html.join(' ')
}

socket.on('lista-mensajes', mensajes=>{
    renderMensajes(mensajes)
})

socket.on('conexion', mensajes=>{
    renderMensajes(mensajes)
})