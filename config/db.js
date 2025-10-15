//Acceder a los datos
//Acceder al archivo .env
require("dotenv").config();

//La promesa de conexion con mysql2
const mysql = require("mysql2/promise");

//Crear la conexion a la base de datos (POOL DE CONEXIONES)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//Exportar la conexión para usarla en otros archivos
module.exports = pool;
