const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports=function(app) {

    app.use(
        "/svc-local",
        createProxyMiddleware({
            target:"https://conv.rakbankonline.ae/eida/",
            changeOrigin:true,
            secure:false
        }

        )
    )
}