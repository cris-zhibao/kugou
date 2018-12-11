module.exports={
    outputDir:'dist',
    devServer:{
        host:'localhost',
        port:'8081',
        hotOnly:true,
        open:true,
        https:false,
        proxy:{
            '/proxy':{
                target:'http://m.kugou.com',
                secure:false, //是否是https
                changeOrigin:true, //是否允许跨域
                pathRewrite:{
                    "^/proxy":''
                }
            }
        },
        headers: {
             "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"
        }
    }
}