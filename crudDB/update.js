const { options } = require("../mariaDB/conexionDB");

const knex = require('knex')(options)

knex.from('cars').where('precio', '=', 400000).update({
    precio: 444000
})
.then(resp => console.log(resp))
.catch(err => console.log(err))
.finally(()=> knex.destroy())