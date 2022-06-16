let initialState = { UpdateAR: 'false' };

function stateAR(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_AR':
            return {
                ...state,
                UpdateAR: action.value,
            }
        default:
            return state;
    }
}

  export default stateAR