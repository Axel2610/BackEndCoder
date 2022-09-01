const ContenedorDB = require("./contenedorDB");
const ContenedorMSJ = require("./contenedorMsjSQLITE");

const contenedorDB = new ContenedorDB()


const obj = {
    nombre: "Zapatillas",
    categoria: "Calzado",
    descripcion: "Urbana",
    precio: 300,
    img: "https://cdn3.iconfinder.com/data/icons/other-icons/48/nike_shoes-256.png",
}

// contenedorDB.insertar(obj)

// contenedorDB.update(2,120)

// contenedorDB.getbyID(1)

// contenedorDB.getAll()

// contenedorDB.deletebyID(7)

// NO USAR 
//contenedorDB.deleteAll()




///////////// CHAT

const contenedorMsj = new ContenedorMSJ()

const msj = {
    mensaje: "Hola mundo",
    email: "abc@123",
    fecha: "Thu Aug 18 2022 11:16:20 GMT-0300 (hora estándar de Argentina)",
}

// contenedorMsj.save(msj)
contenedorMsj.getAll()