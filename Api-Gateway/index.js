const Server  = require("./Server/server");

const port = process.env.PORT || 3002;

const server = new Server(port);

server.start();