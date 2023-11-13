const express = require("express");
const app = express
const functionsRouter = express.Router();
const dbfun = require("./dbfun")

// Ver todas las tareas
app.get("/tareas", async (req, res) => {
    try {
      const uri = process.env.MONGO_URI;
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db("listaTareas");
      const collection = db.collection("tareas");
      const tasks = await listTasks(collection); 
      client.close(); 
      res.json(tasks);
    } catch (error) {
      console.error("Error al obtener la lista de tareas:", error);
      res.status(500).send("Error al obtener las tareas.");
    }
  });

//Ver una tarea especifica
  app.get("/tareas/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    try {
      const uri = process.env.MONGO_URI;
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db("listaTareas");
      const collection = db.collection("tareas");
  
      const task = await getTaskById(collection, taskId);
      client.close();
  
      if (task) {
        res.json(task);
      } else {
        res.status(404).send("Tarea no encontrada");
      }
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      res.status(500).send("Error al obtener la tarea.");
    }
  });


//Agregar tarea al sistema
functionsRouter.post("/agregar", (req,res) => {
    const nuevaTarea = req.body;
    if (!nuevaTarea) {
        res.send({message:"El cuerpo de la solicitud no es valido"})
     }  else {
        dbfun.createTask(nuevaTarea);
        console.log(nuevaTarea);
        res.json({
            status: 200,
            data: nuevaTarea,
            message: "tarea agregada con exito",

        })
    }
})


//Eliminar tarea
functionsRouter.delete('/eliminar/:id', (req,res) => {
    const id = req.params.id;
    dbfun.deleteTask(id);
    res.send("La tarea fue eliminada con exito")
})


//Marcar Tarea como completada
app.put("/tasks/:taskId/completada", async (req, res) => {
    const taskId = req.params.taskId;
    const { completada } = req.body;
    try {
      const uri = process.env.MONGO_URI;
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db("listaTareas");
      const collection = db.collection("tareas");
      const result = await updateTask(collection, taskId, completada);
      client.close();
  
      if (result.modifiedCount > 0) {
        res.json({ message: "Tarea actualizada con éxito" });
      } else {
        res.status(404).send("Tarea no encontrada");
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).send("Error al actualizar la tarea.");
    }
  });
  

module.exports = functionsRouter