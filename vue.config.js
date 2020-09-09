module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': "@/assets",
                'components': "@/components",
                'common': "@/common",
                'network': '@/network',
                'views': "@/views"
            }
        }
    }
    // ,
    // devServer: {
    //     public: '0.0.0.0:8080',
    //     disableHostCheck: true,
    // }
}