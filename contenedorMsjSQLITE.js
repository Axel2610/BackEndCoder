const { options } = require("./sqlite3/conexionDB");
const knex = require('knex')(options)

class ContenedorMSJ {
    
    async save(obj){
        try {
            await knex('mensajes').insert(obj)
        } catch (error) {
            console.log(error)            
        }
        finally{
            knex.destroy()
        }
    }


    async getbyID(id){
        try {  
            await knex.from('mensajes').select('*').where('id', '=', id)
            .then(resp => console.log(resp))
        } catch (error) {
            console.log(error)
        }
        finally{
            knex.destroy()
        }
    }


    async getAll(){
        try {
            await knex.from('mensajes').select('*')
            .then(resp => console.log(resp))
        } catch (error) {
            console.log(error)
        }
        finally{
            knex.destroy()
        }
    }

    async deletebyID(id){
        try {
            await knex.from('mensajes').where('id', '=', id).del()
        } catch (error) {
            console.log(error)
        } finally{
            knex.destroy()
        }
    }

    async deleteAll(){
        try {
            await knex.from('mensajes').del()
        } catch (error) {
            console.log(error)
        }finally{
            knex.destroy()
        }
    }
}


module.exports = ContenedorMSJ