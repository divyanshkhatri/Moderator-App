import React, {Component} from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { TextButton } from 'react-native-material-buttons';
import {login} from '../actions/index';
import {connect} from 'react-redux';

class Form extends Component {

    state = {
        email: 'ab@cp.co',
        password: 'me2@codepark'
    }
    refreshStateEmail = (text) => {
        this.setState({email: text})
    }
    refreshStatePassword = (text) => {
        this.setState({password: text})
    }
    onPressButton(){

        const { email, password } = this.state;
        this.props.login(email, password);
    }

    render(){
        
        const email = this.state.email;
        const password = this.state.password;

        return(
            <View>
                <View style = {{
                    marginTop: 200,
                    justifyContent:'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                <Image
                        style={{width:Dimensions.get('window').width ,height:90}}
                        source={require('../images/download.png')}
                    />
                </View>
                <View style = { { marginLeft: 20 ,marginRight: 20, marginTop: 100} } >
                    
                    <TextField 
                        style = {{ paddingRight: 15,alignItems: "center", justifyContent: "center"}}
                        label = 'Email'
                        labelPadding = {5}
                        labelFontSize = {25}
                        multiline = {true}
                        value= {email}
                        placeholder = {'Enter Email'}
                        tintColor = 'rgb(44, 93, 85)'
                        inputContainerStyle    
                        autoCapitalize = "none"
                        onChangeText = {this.refreshStateEmail.bind(this)}    
                    />
                    <View style = { {marginTop: 20} }>
                        <TextField 
                            style = {{paddingRight: 15}}
                            label = 'Password'
                            labelPadding = {5}
                            labelFontSize = {25}
                            multiline = {true}
                            value={password}
                            placeholder = {'Enter Password'}
                            tintColor = 'rgb(44, 93, 85)'
                            inputContainerStyle      
                            secureTextEntry
                            autoCapitalize = "none"
                            onChangeText = {this.refreshStatePassword.bind(this)}      
                        />
                    </View>
                    <View style = {{marginTop: 20, alignItems: 'center'}} >

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
                        onPress = {this.onPressButton.bind(this)}
                    />
                </View>  
                </View>
            </View>
        )
    }
}

export default connect(null, {login})(Form);