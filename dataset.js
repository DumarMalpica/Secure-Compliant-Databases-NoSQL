require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function insertarDatos() {
  try {
    await client.connect();
    const db = client.db("empresa");
    const usuarios = db.collection("usuarios");

    await usuarios.insertMany([
      { nombre: "Ana Pérez", correo: "ana@example.com", telefono: "3001234567", ciudad: "Bogotá" },
      { nombre: "Carlos Ruiz", correo: "carlos@example.com", telefono: "3107654321", ciudad: "Medellín" },
      { nombre: "Laura Gómez", correo: "laura@example.com", telefono: "3202223333", ciudad: "Cali" }
    ]);

    console.log("✅ Datos personales simulados insertados correctamente.");
  } catch (err) {
    console.error("❌ Error al insertar datos:", err);
  } finally {
    await client.close();
  }
}

insertarDatos();
