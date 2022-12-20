const {Pool} = require("pg")
const types = require("pg").types

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB
});

//Para que la zona horario corresponda a la de la base de datos
types.setTypeParser(1184, str => str);
types.setTypeParser(1114, str => str);
module.exports = pool;