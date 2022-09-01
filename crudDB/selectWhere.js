const { options } = require("../mariaDB/conexionDB");

const knex = require('knex')(options)

knex.from('cars').select('*').where('precio', '>', 300000)
.then(resp => console.log(resp))
.catch(err => console.log(err))
.finally(()=> knex.destroy())