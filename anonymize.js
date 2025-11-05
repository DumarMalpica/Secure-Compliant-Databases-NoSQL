require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function anonimizarDatos() {
  try {
    await client.connect();
    const db = client.db("empresa");

    // Colecciones separadas
    const original = db.collection("usuarios_original");
    const anonimizados = db.collection("usuarios_anonimizados");

    const usuarios = await original.find().toArray();

    for (const u of usuarios) {
      const anon = {
        nombre: "ANONIMO",
        correo: `anon_${u._id}@mail.com`,
        telefono: null,
        ciudad: u.ciudad
      };
      await anonimizados.insertOne(anon);
    }

    console.log("Datos anonimizados correctamente en 'usuarios_anonimizados'.");
  } catch (err) {
    console.error("Error en anonimización:", err);
  } finally {
    await client.close();
  }
}

anonimizarDatos();
