const initialState={
    data: ''
  }
  
  const LoginReducer=(state=initialState, action) =>{
    
    switch (action.type) {
      case 'loginData': 
        return { ...state, data: action.payload.username }
      default:
        return initialState;
    }
  }
  
  export default LoginReducer;