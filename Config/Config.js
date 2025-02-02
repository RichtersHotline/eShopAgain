import { createPool } from "mysql2";
import "dotenv/config";
let connection = createPool({ 
    host: process.env.hostDB,
    user: process.env.userDB,
    password: process.env.PWDdb,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30

})
connection.on("Connection", (pool) => {
 
    if(!pool) throw new Error ("There was a problem connecting to the database. Contact Your Site Director for further details.")

}) 
export {

    connection


}