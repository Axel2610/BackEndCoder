const { options } = require("./mariaDB/conexionDB");
const knex = require('knex')(options)

class ContenedorDB {
    
    async save(obj){
        try {
            await knex('productos').insert(obj)
        } catch (error) {
            console.log(err)            
        }
        finally{
            knex.destroy()
        }
    }

    async update(id, precio){
        try {
            await knex.from('productos').where('id', '=', id).update({
                precio: precio
            })
        } catch (error) {
            console.log(error)
        }
        finally{
            knex.destroy()
        }
    }


    async getbyID(id){
        try {  
            await knex.from('productos').select('*').where('id', '=', id)
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
            await knex.from('productos').select('*')
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
            await knex.from('productos').where('id', '=', id).del()
        } catch (error) {
            console.log(error)
        } finally{
            knex.destroy()
        }
    }

    async deleteAll(){
        try {
            await knex.from('productos').del()
        } catch (error) {
            console.log(error)
        }finally{
            knex.destroy()
        }
    }
}


module.exports = ContenedorDB