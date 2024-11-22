import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
export const testConnection = async () => {
  try {
   
    const connection = await db.getConnection();

    
    const [rows] = await connection.query("SELECT 1 AS test");

    console.log("Database connection successful. Test query result:", rows);

    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};


