const { options } = require("../mariaDB/conexionDB");

const knex = require('knex')(options)

const cars = [
    {name: 'BMW', precio: 200000},
    {name: 'Audi', precio: 300000},
    {name: 'Mercedes', precio: 400000},
    {name: 'Ferrari', precio: 500000},
    {name: 'Porsche', precio: 600000},
]

knex('cars').insert(cars)
.then(data=> console.log(data))
.catch(err=> console.log(err))
.finally(()=> knex.destroy())