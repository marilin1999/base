const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const crud = require("./dbfun")

async function connectToMongoAtlas() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Conexión exitosa a MongoDB Atlas");
    
  } catch (error) {
    console.log("Error al conectar a MongoDB Atlas:", error);
  }
}

function getClient() {
  return client;
}

module.exports = {
  connectToMongoAtlas,
  getClient,
};