import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    AsyncStorage,
    Picker,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {events, neworderevents} from '../actions';
import moment from 'moment';
import {moreEvents} from '../actions';
import { Dropdown } from 'react-native-material-dropdown';

class Events extends Component {
    
    componentDidMount(){
        AsyncStorage.getItem('token')
        .then(token => {
            this.setState({token: token})
            this.props.events({event: this.props.url, token, page: 0, order: -1})
        })
    }
    state = {
        token: '',
        page: 1,
        loading: false,
        order: -1
    }

    pageIncrease = () => {

        this.setState({
            page: this.state.page + 1,
            loading: true
        })
    } 
    loadMore = () => {

        console.log(this.state.page)
        var token = this.state.token;
        var page = this.state.page;
        var order = this.state.order;
        this.props.moreEvents({event: this.props.url, token, page, order});

    }
    loader = () => {
        if(this.state.loading == true){
            return(<ActivityIndicator size = "small" />)
        }
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
    };
    
    changeValue = (data) => {
        console.log(data)
        this.setState({
            order: data
        })
        token = this.state.token;
        order = this.state.order;
        this.setState({page: 0})
        var page = this.state.page;
        console.log(token, order);
        this.props.neworderevents({event: this.props.url, token, page, order})
        this.setState({page: 1})
    }

    render(){

        let data = [{
            value: '-1',
        }, {
            value: '1',
        }];

        return(
            <View style = {{flex: 1, paddingBottom: 20}}>

                {this.loader()}

                <View style = {{
                    borderBottomWidth: 1,
                    borderBottomColor:'rgb(188,188,188)',
                    marginLeft: 40,
                    marginRight: 40
                }}>

                <Text style = {{ 
                    marginTop: 45, 
                    fontSize: 30, 
                    alignSelf: 'center', 
                    fontWeight: '700',
                    paddingBottom: 2
                    }}>EVENTS</Text>

                </View>
                <View style = {{
                    marginLeft: 30,
                    marginRight: 30
                }}>
                    <Dropdown
                        label='Choose Order'
                        data={data}
                        textColor = 'rgb(44, 93, 85)'
                        onChangeText = {(data) => this.changeValue(data)}
                    />
                </View>
                <FlatList 
                    data = {this.props.data}
                    renderItem =
                        {({item}) => (
                            <View>
                                <View style = {{
                                    marginLeft: 30, 
                                    marginRight: 30,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    paddingTop: 20,
                                    paddingLeft: 15,
                                    paddingRight: 15
                                }}>
                                    <View style = {{flexDirection: "row"}}>
                                        <Image
                                        source = {require('../images/activity.png')}
                                        style = {{height: 35, width: 35}}
                                        />
                                        <Text style = {{marginLeft: 5, marginTop: 3, paddingBottom: 20, flexShrink: 1}} >{item.activity}</Text>
                                    </View>
                                    <View style = {{flexDirection: "row-reverse", paddingBottom: 5}}>
                                        <Text>{moment(item.timestamp).utc().fromNow()}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    ListFooterComponent = {this.renderFooter()}
                    onEndReached = {() => {this.pageIncrease(); this.loadMore()}}
                    onEndReachedThreshold = {0.5}
                />
            </View>
        )
    }

}

const mapStateToProps = state => {

    const { Event } = state;
    return {
        data: state.Event.data[0]
    }
}

const styles = {
    
    viewStyle: {
        flex: 1,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 30,
        marginRight: 30,
        flexShrink: 1,
        marginTop: 20,
        paddingTop: 20,
        borderRadius: 5
    },
    Dropdown: {
        marginLeft: 30, 
        marginRight: 30
    }
}

export default connect(mapStateToProps, {events, moreEvents, neworderevents})(Events);