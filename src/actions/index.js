import axios from 'axios';
import { Actions }  from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

var a = [];
var eventDisplay = [];
var eventorder = [];

export const login = (email,password) => { 

    let user  = {email,password};
    user = JSON.stringify(user);
    return((dispatch) => {
      axios.post('https://test-bcp.codepark.in/auth/verifyUser',user, {headers: {'Content-Type' : 'application/json'}})
      .then((res) => {
        dispatch({type:'loginData', payload:res.data.cookies.CP})
        AsyncStorage.setItem('token', res.data.cookies.CP)
        AsyncStorage.setItem('data', res.data.userData)
        Actions.main({user: res.data.userData});
      }) 
    })
  }

export const details = (token) => {

    const Token = token.token;
    const headerParams = { 
    'Authorization': "Bearer " + Token,
    'Content-Type': 'application/json'
    }
    var config = {
    headers: headerParams
    }
    return((dispatch) => {
    axios.get('https://test-bcp.codepark.in/topic/mod/dashboard?node=0&sub=all&order=-1', config )
        .then((response) => {
        console.log(Token, config)
        a.push(response.data.topics)
        console.log(a)
        dispatch( { type: 'apiCallDashboard', payload: a } )
        console.log(response.data.topics)
        })
    })
}

export const makeRequest = ({token, page}) => {
  var b= [];
  console.log(page);
  const headerParams = { 
  'Authorization': "Bearer " + token,
  'Content-Type': 'application/json'
  }
  var config = {
  headers: headerParams
  }
  console.log(config)
  return((dispatch) => {
  axios.get(`https://test-bcp.codepark.in/topic/mod/dashboard?node=${page}&sub=all&order=-1`, config )
      .then((response) => {
      b.push(response.data.topics);
      b[0].forEach(function(item) {
        a[0].push(item)
      });
      console.log(a);
      dispatch( { type: 'apiCallDashboard', payload: a } )
      console.log(response.data)
      })
  })
}

export const events = ({event, token, page, order}) => {

  const Token = token.token;
  const headerParams = { 
    'Authorization': "Bearer " + Token,
    'Content-Type': 'application/json'
    }
    var config = {
    headers: headerParams
    }
    eventDisplay = [];
    return((dispatch) => {
      axios.get(`https://test-ecp.codepark.in/moderate/event/activity/${event}?node=${page}&sort_time=${order}`, config )
           .then((response) => {
              eventDisplay.push(response.data.activities);
              console.log(response);
              dispatch( { type : 'eventsList', payload: eventDisplay } )
           })
    })
}

export const neworderevents = ({event, token, page, order}) => {

  const Token = token.token;
  const headerParams = { 
    'Authorization': "Bearer " + Token,
    'Content-Type': 'application/json'
    }
    var config = {
    headers: headerParams
    }
    console.log(page)
    return((dispatch) => {
      axios.get(`https://test-ecp.codepark.in/moderate/event/activity/${event}?node=${page}&order=${order}`, config )
           .then((response) => {
              eventorder.push(response.data.activities);
              console.log(response);
              dispatch( { type : 'eventsList', payload: eventorder } )
           })
      })
}

export const moreEvents = ({event, token, page, order}) => {

  var moreEvents = [];
  const headerParams = { 
    'Authorization': "Bearer " + token,
    'Content-Type': 'application/json'
    }
    var config = {
    headers: headerParams
    }
    return((dispatch) => {
      axios.get(`https://test-ecp.codepark.in/moderate/event/activity/${event}?node=${page}&order=${order}`, config )
           .then((response) => {
              moreEvents.push(response.data.activities);
              moreEvents[0].forEach(function(item){
                eventDisplay[0].push(item);
              });
              console.log(response);
              dispatch( { type : 'eventsList', payload: eventDisplay } )
           })
    })
}

export const textChange = (name, can_accept, uid, token, description, avatar) => {

    const headerParams = {
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'
    } 
    return( (dispatch) => {
      var config = {
        headers: headerParams
      };
      console.log(token)
      var params = {};
      params.uid = uid
      params.name = name
      params.description = description
      params.avatar = avatar
      params.acceptSubscription = 0
      console.log(params)
      axios.post('https://test-bcp.codepark.in/topic/mod/update', params, config)
        .then((response) => {
          console.log(response)
          dispatch({ type: 'textChanged', payload: response.data})
          })
        .catch(error => {
          console.log(error.response)
        })
    } )
  
  }