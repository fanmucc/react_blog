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

// 判断数组长度是小于特定长度，如果小于则返回true
export const arrayLength = (array, length) => {
    console.log(array, length)
    return array.length === length ? true : false
}