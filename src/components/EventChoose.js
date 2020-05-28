import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

class EventChoose extends Component {

    componentDidMount(){
        Axios.get('https://test-ecp.codepark.in/events/')
        .then((response) => {
            this.setState({events: response.data.events})
            console.log(this.state.events);
        })
    }
    state = {
        events: null,
    }

    renderFooter = () => {
        if(this.state.events == null)
        return(
            <View style = {{marginTop: 50}}>
                <ActivityIndicator animating size = 'small' />
            </View>
        )
        else {
            return <View></View>
        }
    }

    displayList (){
        if(this.state.events == []){
            return(
                <View style = {{marginTop: 50}}>
                    <ActivityIndicator animating size = 'small' />
                </View>
            )
        } else {
            return(
                <FlatList 
                    data = {this.state.events}
                    renderItem = {({item}) => (
                        <View style = {styles.viewStyle}>
                            <TouchableOpacity onPress = { () => Actions.Events({url: item.urlName}) } > 
                                <Text style = {{
                                    alignSelf: 'center',
                                    fontWeight: '400',
                                    fontSize: 16
                                }}
                                >{item.name.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListFooterComponent = {this.renderFooter()}
                />
            )
        }
        
    }

    render(){
        return(
            <View style = {{
                flex: 1,
                marginTop: 50,
            }}>
                <View style = {{
                    borderBottomWidth: 1,
                    borderBottomColor:'rgb(188,188,188)',
                    marginLeft: 40,
                    marginRight: 40,
                    paddingBottom: 4
                }}>
                    <Text style = {{
                        fontSize: 30,
                        fontWeight: '700',
                        alignSelf: 'center'
                    }}>EVENTS</Text>
                </View>
                <Text 
                    style = {{
                        marginTop: 20,
                        alignSelf: 'center'
                    }}>Click on any of the event to display its activity</Text>
                {this.displayList()}
            </View>
        )
    }   
}

const styles = {
    viewStyle: {
        marginTop: 40
    }
}

export default EventChoose;