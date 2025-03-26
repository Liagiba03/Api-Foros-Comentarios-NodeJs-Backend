const { application } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

class ProxyService{
    static createProxy(target){
        return createProxyMiddleware({
            target:target,
            changeOrigin:true,
            pathRewrite:(path,req) => path.replace(req.baseUrl,""),
            onProxyReq: (proxyReq, req)=>{
                if(req.body && Object.keys(req.body).length){
                    const bodyData = JSON.stringify(req.body);

                    proxyReq.setHeader('Content-Type', application/json);
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            }
        });
    }
}

module.exports =ProxyService;

/*
PROBAR

const { createProxyMiddleware } = require("http-proxy-middleware");

class ProxyService {
    static createProxy(target) {
        return createProxyMiddleware({
            target: target,
            changeOrigin: true,
            pathRewrite: (path, req) => path.replace(req.baseUrl, ""),
            onProxyReq: (proxyReq, req, res) => {
                if (req.body) {
                    const bodyData = JSON.stringify(req.body);
                    // Update the content-length header
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    // Write the body data to the proxy request
                    proxyReq.write(bodyData);
                }
            }
        });
    }
}

module.exports = ProxyService;


*/