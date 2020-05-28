const initialState = {
    data: ''
}

  
const DashboardReducer = (state= initialState, action) =>{
    
    switch (action.type) {
      case 'apiCallDashboard': 
        return { ...state, data: action.payload }
      default:
        return initialState;
    }
}


export default DashboardReducer;