const routes = require("express").Router();
const ProxyService = require("../Server/proxyService")
const {services} = require("../config/service")

services.forEach(({url, path}) => {
    //app.use("/", req, res)=>{})
    routes.use(path, ProxyService.createProxy(url))
});

module.exports =routes;

