// store/reducers/ToggleReducer.js


let initialState = { modelFound: 'false',modelAR:'false',modelImg:'false',activateAR:'false',activateWV:'false',activateIMG:'false',arTab: 'false' };


function toggleWebView(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_WEBVIEW':
            return {
                ...state,
                modelFound: action.value,
            }
        case 'TOGGLE_AR':
            return {
                ...state,
                modelAR: action.value,
            }
        case 'TOGGLE_IMG':
            return {
                ...state,
                modelImg: action.value,
            }
        case 'ACTIVATE_AR':
            return {
                ...state,
                activateAR: action.value,
            }
        case 'ACTIVATE_WB':
            return {
                ...state,
                activateWB: action.value,
            }
        case 'ACTIVATE_IMG':
            return {
                ...state,
                activateIMG: action.value,
            }
        case 'TOGGLE_AR_TAB':
            return {
                ...state,
                arTab: action.value,
            }
        default:
            return state;
    }
}

export default toggleWebView