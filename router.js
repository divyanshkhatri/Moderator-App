import React, {Component} from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux'; 
import { AsyncStorage } from 'react-native';
import Form from './src/components/Form';
import LoggedIn from './src/components/Loggedin';
import Details from './src/components/Details';
import Choose from './src/components/Choose';
import Events from './src/components/Events';
import EventChoose from './src/components/EventChoose';

class RouterComponent extends Component {

    constructor(props){
        super(props)
        AsyncStorage.getItem('token')
            .then((userToken) => {
            if(userToken ? Actions.main() : Actions.auth());
        })
    }

    render(){
        return(
            <Router {...sceneConfig}>
                <Scene key = "root" hideNavBar>
                    <Scene key = "auth">
                        <Scene key = "Login" component = {Form} title = "" navTransparent hideNavBar initial/>
                    </Scene>
                    <Scene key = "main">
                        <Scene key = "Choose" component = {Choose} title = "" hideNavBar initial />
                        <Scene key = "LoggedIn" component = {LoggedIn} title = "" hideNavBar />
                        <Scene key = "Events" component = {Events} title = "" hideNavBar />
                        <Scene key = "Details" component = {Details} title = "" hideNavBar/>
                        <Scene key = "EventChoose" component = {EventChoose} title = "" hideNavBar />
                    </Scene>
                </Scene>
            </Router>
        )
    }

}
var sceneConfig = {
    cardStyle: {
      backgroundColor: 'white'
    }
}


export default RouterComponent;
