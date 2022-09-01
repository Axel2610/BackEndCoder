// const { options } = require('../mariaDB/conexionDB')
const { options } = require('../sqlite3/conexionDB')
const knex = require('knex')(options)

const batch = async () => {
    try {
        console.log('--> Borrando todos los autos')
        await knex('cars').del()

        console.log('--> Insertamos autos')
        await knex('cars').insert([
            { name: 'Ferrari', price: '9000000' },
            { name: 'Lamborghini', price: '10000000' },
            { name: 'Porsche', price: '8000000' },
            { name: 'BMW', price: '7000000' },
            { name: 'Mercedes', price: '6000000' },
            { name: 'Audi', price: '5000000' },
            { name: 'Ford', price: '4000000' },
            { name: 'Chevrolet', price: '3000000' },
            { name: 'Honda', price: '2000000' },
            { name: 'Toyota', price: '1000000' }
        ])

        console.log('--> Leemos todos los autos')
        let rows = await knex().from('cars').select('*')
        for (row of rows) console.log(row)

        console.log('--> Insertamos un auto más')
        await knex('cars').insert({ name: 'Nissan', price: '2000000' })

        console.log('--> leemos los autos actualizados')
        rows = await knex().from('cars').select('*')
        for (row of rows) console.log(`${row['name']} - ${row['price']}`)

    } catch (error) {
        console.log(error)
    }
    finally {
        knex.destroy()
    }
}

batch()
