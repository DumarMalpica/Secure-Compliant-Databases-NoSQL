require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function anonimizarDatos() {
  try {
    await client.connect();
    const db = client.db("empresa");
    const usuarios = db.collection("usuarios");

    await usuarios.updateMany({}, [
      { $set: {
          nombre: "ANONIMO",
          correo: { $concat: ["anon_", { $toString: "$_id" }, "@mail.com"] },
          telefono: null
      }}
    ]);

    console.log("✅ Datos anonimizados correctamente.");
  } catch (err) {
    console.error("❌ Error en anonimización:", err);
  } finally {
    await client.close();
  }
}

anonimizarDatos();
