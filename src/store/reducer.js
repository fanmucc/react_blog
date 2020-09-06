const defaultState = {
    tag: null,
}

export default (state = defaultState, action) => {
    if (action.type === 'CLICK_TAG') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.tag = action.value
        return newState
    }
    return state
}