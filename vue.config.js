module.exports = {
    // 选项...
    devServer: {
        // development server port 8000
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8088',     // 拦截到'api/wristband'的，将axios中baseURL替换成target
                ws: true,                                 // proxy websockets
                changeOrigin: true,                       // 是否跨域
                // pathRewriti/': '/api', 
                // '^api':'/ae: {                         // 重写，根据需要
                // //   '^/appi'
                // }
            },
        }
      },
    
  }