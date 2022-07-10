const loggedReducer = (state = "emptied", action) => {
    switch (action.type) {
        case "WRITE_TOKEN":
            return action.payload;
        default:
            return state
    }
}

export default loggedReducer;