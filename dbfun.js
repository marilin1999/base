const env = require("dotenv").config();
const dbfunciones = require("./functions");
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

// =================== CRUD Functions ===========================================================//

async function connectToMongoAtlas() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Conexión exitosa");
  } catch (error) {
    console.log(error);
  }
}

async function createTask(nuevaTarea) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("listaTareas");
    const collection = db.collection("tareas");
    await collection.insertOne(nuevaTarea);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

async function deleteTask(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("listaTareas");
    const collection = db.collection("tareas");
    await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

async function listTasks() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("listaTareas");
    const collection = db.collection("tareas");
    const tasks = await collection.find({}).toArray();
    return tasks;
  } catch (error) {
    console.error("Error al consultar las tareas:", error);
    return [];
  } finally {
    client.close();
  }
}

async function updateTask(taskId, completada) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("listaTareas");
    const collection = db.collection("tareas");
    const result = await collection.updateOne({ _id: new ObjectId(taskId) }, { $set: { completada } });

    if (result.modifiedCount > 0) {
      console.log("Tarea actualizada con éxito");
      return true;
    } else {
      console.log("No se encontró la tarea para actualizar");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    client.close();
  }
}

async function getTask(collection, taskId) {
  try {
    const task = await collection.findOne({ _id: new ObjectId(taskId) });
    return task;
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${taskId}:`, error);
    throw error;
  }
}

// =============================================================================================//
//  =============================================================================================//

module.exports = { createTask, deleteTask, listTasks, updateTask, getTask };