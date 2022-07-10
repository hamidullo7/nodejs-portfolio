export const setToken = (token) => {
    return {
        type: "WRITE_TOKEN",
        payload: token
    }
}

export const logged = (log) => {
    return {
        type: "LOGGED",
        payload: log
    }
}