const { options } = require("../mariaDB/conexionDB");

const knex = require('knex')(options)

knex.from('cars').where('precio', '>=', 500000).del()
.then(resp => console.log(resp))
.catch(err => console.log(err))
.finally(()=> knex.destroy())