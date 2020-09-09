module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视口的宽度 对应的是我们设计稿的宽度(750->30px本质上是375->15px)
            viewportHeight: 667, //视窗的高度 对应的使我们设计稿的高度(设置稿：iphone6 750*1334 667*2=1334)
            unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw  （也有别的：vh）
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类 希望在什么屏幕下都不要变化 后面再讲
            // 一个个类写太麻烦 直接给个ignore类 然后不需要转换的就加上ignore类
            minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
            mediaQuery: false, //允许在媒体查询中转换'px'
            exclude: [/TabBar/] // /^TabBar/表示必须以TabBar开头的文件  /TabBar/表示包含TabBar的文件
                //排除掉的文件
        }
    }

}