// export function debounce(func, delay) {
//     let timer = null
//     return function(...args) {
//         if (timer) clearTimeout(timer)
//         timer = setTimeout(() => {
//             func.apply(this, args)
//         }, delay)
//     }
// }

export function debounce(func, delay = 50) {
    let timer = null;
    return function() {
        if (timer !== null) {
            clearTimeout(timer)
        }
        //.apply 执行函数  this?？apply绑定this指向？
        timer = setTimeout(func, delay);
    }
}

export function formatDate(date, fmt) {
    // 1、获取年份
    // y+  正则表达式的规则  正则表达式是用来做字符串匹配的利器（难，因为规则太多了）
    // +表示要匹配一个或者多个
    // *表示要匹配0个或者多个
    // ?表示要匹配0个或者一个
    // yy-19  yyyy-1029  y-9  yyy019
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 2、获取
    //M+   是正则表达式中的规则 
    // 因为不知道要匹配几个M  别人可能传2/3/4个 
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(), //h和H没区分
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};