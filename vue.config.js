const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,

    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
            
    },

    css: {
      sourceMap: true,
      extract: false,
      loaderOptions: {
        postcss: {
            plugins: [
                require('postcss-pxtorem')({
                    rootValue : 37.5, // 换算的基数
                    // selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
                    propList   : ['*'],
                }),
            ]
        }
    }
    }
}