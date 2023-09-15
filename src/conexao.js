const { Pool } = require('pg')

const pool = new Pool({
	host: 'ec2-44-213-228-107.compute-1.amazonaws.com',
	port: 5432,
	user: 'dztfcqgcjlbvkf',
	password: '2f2b0e31c8a54693fc0e60dbdcf903de9a6184398d91dcaaa281a2bcbba5fa89',
	database: 'd27pn301fddtsj',
})

module.exports = pool
