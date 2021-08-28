module.exports ={
    devServer:{
        proxy:{
            '/api': {
                target: 'http://localhost:3434',//目标路径 真实网址 
                changeOrigin: true,//允许跨域
                pathRewrite:{
                  "^/api":''
                }
              },
        }
    }
  }