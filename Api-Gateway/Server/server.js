const express = require("express");
const cors = require("cors");
const { logger } = require("../Middlewares/logger");
const gatewayRoutes = require("../routes/gateway.routes");


class Server{
    constructor(port){
        //Se inicializa todo cada vez que se crea un objeto
        this.app = express();
        this.port = port;
        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.app.use(cors());
        //this.app.use(express.json());
        this.app.use(logger);
    }

    routes(){
        this.app.use("/",gatewayRoutes)
    }

    start(){
        this.app.listen(this.port, ()=> console.log("Gateway corriendo en http://localhost:"+this.port));
    }
}

module.exports = Server

