const { options } = require('../sqlite3/conexionDB')

const knex = require('knex')(options)

// knex.schema.createTable('users', table =>{
//     table.increments('id')
//     table.string('name')
//     table.string('email')
//     table.string('password')
//     table.integer('edad')
// })

const crearTabla = async (nombreTabla) => {
    try {
        await knex.schema.createTable(nombreTabla, table =>{
            table.increments('id')
            table.string('mensaje')
            table.string('email')
            table.string('fecha')    
        })
        console.log('Tabla creada')
    } catch (error) {
        console.log(error)
    } 
    
}

crearTabla('mensajes')
