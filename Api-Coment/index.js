const express = require('express');
const cors = require('cors');
const connectDB = require('./data/config')
require('dotenv').config();
const commentRoutes = require('./Routes/commentRoutes');

//Cargar variables de entorno
const port = process.env.PORT;

//Instancia del servidor
const app = express();
app.use(cors());
app.use(express.json());

//Exportar las rutas para las peticiones
app.use("/", commentRoutes);

//Hacer conexion con la base de datos
connectDB(()=>{
    app.listen(port,()=>{
        console.log("Server running in http://localhost:"+port)
    });
})

