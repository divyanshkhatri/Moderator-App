import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Choose extends Component {

    nextPage() {
        Actions.EventChoose();
    }

    nextPage1() {
        Actions.LoggedIn();
    }

    render(){
        return(
            <View style = {StyleSheet.viewStyle}>
                <View style = {StyleSheet.view1Style}>
                    <TouchableOpacity onPress = {this.nextPage.bind(this)}>
                        <Image 
                        source = {require('../images/events(64).png')} />
                    </TouchableOpacity>
                    <Text style = {{alignSelf: 'center', marginTop: 30, fontSize: 16, fontWeight: '500'}}>
                        EVENTS
                    </Text>
                </View>
                <View style = {StyleSheet.view2Style}>
                    <TouchableOpacity onPress = {this.nextPage1.bind(this)}>
                        <Image 
                        source = {require('../images/topics(64).png')} />
                    </TouchableOpacity>
                    <Text style = {{alignSelf: 'center', marginTop: 30, fontSize: 16, fontWeight: '500'}}>
                        TOPICS
                    </Text>
                </View>
            </View>
        )
    }
}
StyleSheet = {
    viewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    view1Style: {
        alignSelf: 'center',
        marginBottom: 50,
    },
    view2Style: {
        alignSelf: 'center'
    }
}

export default Choose;
