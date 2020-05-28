const INITIAL_STATE = {
    data: ''
}

const eventReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case 'eventsList': 
            return { ...state, data: action.payload };
        default: 
            return INITIAL_STATE;
    }
}
export default eventReducer;