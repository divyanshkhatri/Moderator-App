import React, {Component} from 'react';
import {ScrollView, 
    Dimensions, 
    Text, 
    View,
    Image
} from 'react-native';
import { AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { TextButton } from 'react-native-material-buttons';
import {textChange} from '../actions';
import { CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Details extends Component {

    state = {
        Name: this.props.Name,
        can_accept: this.props.can_accept_subscription,
        description: this.props.description,
        avatar: this.props.avatar,
        data: ''
    }

    componentDidMount(){
        AsyncStorage.getItem('data')
        .then(data => {
            this.setState({data: data})
        })
        
    }

    refreshProps(text){
        this.state.Name = text
    }
    refreshPropsDesc(text){
        this.state.description = text
    }
    refreshPropsAvatar(text){
        this.state.avatar = text
    }
    refreshPropsCanAccept = () => {
        this.state.can_accept = !(this.state.can_accept)
    }

    updateValues = () => {
        this.props.textChange( this.state.Name, this.state.can_accept, this.props.uid, this.props.token, this.state.description, this.state.avatar )
        Actions.main(this.state.data)
    }

    // checkBox(){
    //     alert("Value Changed")
    // }

    // displayAvatar = () => {
    //     if(this.props.avatar)
    //     {
    //         return(
    //             <View>
    //                 <Image
    //                     style={styles.stretch}
    //                     source={require(this.props.avatar)}
    //                 />
    //             </View>
    //         )
    //     }
    //     else {
    //         return(
    //             <View>
    //                 <Image
    //                     style={styles.stretch}
    //                     source={require('../images/download.png')}
    //                 />
    //             </View>
    //         )
    //     }
    // }

    render(){

        return(
            <ScrollView style = {{height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: 'white'}}>
                <View style = {{height: 100, width: Dimensions.get('window').width, backgroundColor: 'rgba(44, 93, 85, 1)'}}>
                    <Text style = {{paddingTop: 53, paddingLeft: 30, fontSize: 23, color: 'white', fontWeight: '500'}}>Details</Text>
                </View>
                <View style = { {marginLeft: 20 ,marginRight: 20, marginTop: 20} } >
                    <TextField 
                        style = {{ paddingRight: 15}}
                        label = 'Name'
                        labelPadding = {5}
                        labelFontSize = {25}
                        multiline = {true}
                        value={this.state.Name}
                        tintColor = 'rgb(44, 93, 85)'
                        inputContainerStyle
                        onChangeText = { (text) => this.refreshProps(text) } 
                    />
                </View>
                <View style = { {marginLeft: 20 ,marginRight: 20, marginTop: 20} } >
                    <TextField 
                        style = {{ paddingRight: 15}}
                        label = 'Description'
                        labelPadding = {5}
                        labelFontSize = {25}
                        multiline = {true}
                        value={this.state.description}
                        tintColor = 'rgb(44, 93, 85)'
                        inputContainerStyle
                        onChangeText = { (text) => this.refreshPropsDesc(text) } 
                    />
                </View>
                <View style = { {marginLeft: 20 ,marginRight: 20, marginTop: 20} } >
                
                    {/* <View>
                        {this.displayAvatar}
                    </View> */}

                    <TextField 
                        style = {{ paddingRight: 15}}
                        label = 'Avatar'
                        labelPadding = {5}
                        labelFontSize = {25}
                        multiline = {true}
                        value={this.state.avatar}
                        tintColor = 'rgb(44, 93, 85)'
                        inputContainerStyle
                        onChangeText = { (text) => this.refreshPropsAvatar(text) } 
                    />
                </View>
                <View>
                    <CheckBox
                        center
                        title = 'Accept Subscription'
                        iconRight
                        checked = {this.state.can_accept}
                        onPress={() => this.setState({can_accept: !this.state.can_accept})}

                    />
                    </View>

                {/* <View style = {styles.toggleStyle}>
                    <ToggleSwitch 
                        isOn={can_accept}
                        onColor='green'
                        offColor='red'
                        label='Can Accept Subscription'
                        labelStyle={{color: 'black', fontWeight: '400'}}
                        size='medium'
                        onToggle={ this.refreshPropsCanAccept }
                        onColor = 'rgba(44, 93, 85, 1)'
                    />
                </View>  */}

                <View style = {{alignItems: 'center'}} >

                    <TextButton 
                        title = 'Submit' 
                        color = 'rgb(250, 250, 250)'
                        shadeColor = 'rgb(44, 93, 85)'
                        titleColor = 'rgba(44, 93, 85, 1)'
                        borderRadius = {1}
                        onPress = {() => this.updateValues()}
                        style = {{
                            borderRadius: 8,
                            borderWidth: 2,
                            fontSize: 20,
                            borderColor: 'rgb(40,40,40)',
                            marginRight: 15,
                            marginBottom: 30
                        }}
                    />
                </View> 
            </ScrollView>
        )
    }
}

styles = {
    toggleStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 20

    }
}

export default connect(null, {textChange})(Details);



