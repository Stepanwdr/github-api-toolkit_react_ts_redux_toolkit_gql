const debounceSearch = (cb: (...args:any) => any, delay: number) => {
    let time: ReturnType<typeof setTimeout> | undefined = undefined
    return (...args:any) => {
        if (time) {
            clearTimeout(time)
        }
        time = setTimeout(()=>cb(...args), delay)
    }
}

export default debounceSearch