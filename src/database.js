const config = require('config');

const { Client } = require('pg')

let client = new Client({
    ...config.get('db')
})

exports.getVmilistsData = async () => {
    const res = await client.query('SELECT * from Vmilists order by id;');
    return res.rows;
}

exports.getSpecializations = async () => {
    const res = await client.query('SELECT * from Specializations order by id;');
    return res.rows;
}

exports.getSpecializationsData = async () => {
    const res = await client.query('SELECT * from specdata order by id;');
    return res.rows;
}

//todo (ichyr) get all relevant data to json

exports.initDbClient = async () => {
    client = new Client({
        ...config.get('db')
    })

    await client.connect()
};

exports.cleanupDbClient = async () => {
    await client.end()
}