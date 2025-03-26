const express = require('express');
const cors = require('cors');
const connectDB = require('./data/config');
require('dotenv').config();
const foroRouters = require('./Routes/foroRoutes');
const userRoutes = require('./Routes/userRoutes');

//Cargar variables de entorno
const port = process.env.PORT || 3000;

//Instancia del servidor
const app = express();
app.use(cors());
app.use(express.json());

//Exportar las rutas para las peticiones
app.use("/", foroRouters);
app.use("/usr", userRoutes);

//Hacer conexion con la base de datos
connectDB(()=>{
    app.listen(port,()=>{
        console.log("Server running in http://localhost:"+port)
    });
})

//Defibir la escucha
/*app.listen(port,()=>{
    console.log("Server running in http://localhost:"+port)
});*/