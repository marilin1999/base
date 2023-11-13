const express = require("express")
const app = express() 
const port = 4000
const env = require("dotenv").config()
const uri = process.env.MONGO_URI;
const functionsRouter = require('./functions')
const dbfun = require("./dbfun")
const { connectToMongoAtlas } = require("./db")
//======================================================

app.use(express.json());
app.use("/tareas", functionsRouter)


app.get("/", (req,res) => {
    res.send("bienvenido a la lista de tareas con MongoDB, Usemos las funciones para lograrlo")
})


 connectToMongoAtlas()


 app.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
  });



