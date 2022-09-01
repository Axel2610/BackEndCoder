const { options } = require("../mariaDB/conexionDB");

const knex = require('knex')(options)

knex.from('cars').del()
.then(resp => console.log(resp))
.catch(err => console.log(err))
.finally(()=> knex.destroy())