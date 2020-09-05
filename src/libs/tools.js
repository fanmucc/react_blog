// 此文件放置于工作内容无关的函数 

// 函数防抖
export const debounce = (fn, wait) => {
    let timer = null
    return function () {
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// 函数节流
export const throttle = (fn, wart) => {
    let timer = null
    return function () {
        let args = arguments
        if(!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(this, args)
            }, wart)
        }
    }
}