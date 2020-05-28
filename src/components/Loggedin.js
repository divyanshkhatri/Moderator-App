import React, {Component} from 'react';
import { Text,
    View, 
    FlatList, 
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { details } from '../actions';
import { makeRequest } from '../actions';
import { connect } from 'react-redux';
import { TextButton } from 'react-native-material-buttons';
import { Actions }  from 'react-native-router-flux';

class LoggedIn extends Component{

    state = {
        token: '',
        page: 1
    }
    componentDidMount(){
        AsyncStorage.getItem('token')
        .then(token => {
            this.setState({token: token})
            this.props.details({token})
        })
        
    }
    pageIncrease = () => {

        this.setState({
            page: this.state.page + 1
        })
        console.log(this.state.page)
    } 
    loadMore = () => {
            console.log(this.state.page)
            var token = this.state.token;
            var page = this.state.page;
            this.props.makeRequest({token, page});
        }

    onPressLogout = () => {
        Actions.auth();
        AsyncStorage.removeItem('token')
    }

    onButtonPress = (uid, Name, number_of_subscribers, can_accept_subscription, created_on, token, description, avatar) => {
        Actions.Details({uid, Name, number_of_subscribers, can_accept_subscription, created_on, uid, token, description, avatar});
      }
    render(){
        const token = this.state.token
        return(
        <View style = {{flex: 1}} >
            <View style = {{ flexDirection: "row", justifyContent: "space-between", height: 100, width: Dimensions.get('window').width, backgroundColor: 'rgba(44, 93, 85, 1)'}}>
            <Text style = {{ paddingTop: 53, paddingLeft: 30, fontSize: 23, color: 'white', fontWeight: '500'}}>Dashboard</Text>
            <TouchableOpacity onPress = {() => this.onPressLogout()}>
                <Text style = {{paddingTop: 53, fontSize: 21, paddingRight: 20, color: 'white', fontWeight: '500'}}>Logout</Text>
            </TouchableOpacity>
            </View>
            <FlatList 
            data = { this.props.data }
            renderItem = {({item}) => (
            <View style= {{ 
              flex: 1,
              paddingTop: 20, 
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            >
            <View style = {styles.viewStyle} >
                <Text style = {styles.textInputStyle}>UID: {item.uid}</Text> 
                <Text style = {{
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 15,
                    fontSize: 10,
                    borderColor: 'rgba(44, 93, 85, 1)'
                }}>NAME: {item.name}</Text> 
                <Text style = {styles.textInputStyle}>SUBSCRIPTIONS: {item.number_of_subscribers}</Text> 
                <Text style = {styles.textInputStyle}>CAN ACCEPT: {item.can_accept_subscription.toString()}</Text>
                <Text style = {styles.textInputStyle}>CREATED ON: {item.created_on}</Text> 

            </View>
            <View style = {{paddingTop: 15, alignItems: 'center'}} >
                <TextButton 
                  title = 'EDIT' 
                  color = 'rgb(250, 250, 250)'
                  shadeColor = 'rgba(44, 93, 85, 1)'
                  titleColor = 'rgba(44, 93, 85, 1)'
                  style = {{
                    borderRadius: 8,
                    borderWidth: 2,
                    fontSize: 20,
                    borderColor: 'rgb(40,40,40)',
                    marginRight: 15
                  }}
  
                  onPress = {() => this.onButtonPress(item.uid, item.name, item.number_of_subscribers, item.can_accept_subscription, item.created_on, token, item.description, item.avatar)}
                />
              </View>
            </View>
            )}
            keyExtractor={item => item.uid}
            onEndReached = {() => {this.pageIncrease(); this.loadMore()}}
            onEndReachedThreshold = {0.5}
            />
        </View>
        )
    }
        
}



const mapStateToProps = (state) => {
    const {Dashboard} = state;
    console.log(Dashboard.data[0])
    return {
        data: Dashboard.data[0]
    }
        
}

const styles = {
    viewStyle: {
      color : 'rgb(250, 250, 250)',
      borderRadius: 8,
      borderColor: 'rgba(44, 93, 85, 1)',
      paddingBottom: 15
    },
    textInputStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 12,
        borderColor: 'rgba(44, 93, 85, 1)'
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
} 
export default connect(mapStateToProps, {details, makeRequest})(LoggedIn)