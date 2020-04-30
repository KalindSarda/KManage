import React,{Component} from 'react';
import { Platform,StyleSheet, View,ActivityIndicator } from 'react-native';
import { Appbar,Provider as PaperProvider, Text,Card,Button,Divider } from 'react-native-paper';
import firebase from 'C:/Users/kalin/KManage/api/fire';

  
export default class Details extends Component
{
    static navigationOptions = {
        headerShown: false,
        
    }
    constructor() {
        super()
        this.ref = firebase.firestore().collection('pocket');
    }
    
    state = {
        key:'',
        category: '',
        note: '',
        amount:0,
        value: '',
        date:'',
        isLoading: true
    }


    
    
    _home = () => this.props.navigation.navigate('Home');
    
    _delete(key) {
        this.ref.doc(key).delete().then(() => {
            this._home()
        })
    }

    
    

    componentDidMount() {
        const { navigation } = this.props;
        const dbRef = this.ref.doc(navigation.getParam('transid'));
        dbRef.get().then((res) => {
            if (res.exists) {
                const trans = res.data();
                this.setState({
                    key: res.id,
                    value:trans.value,
                    category:trans.category,
                    note:trans.note,
                    amount:trans.amount,
                    date:trans.date,
                    isLoading: false
                });
            } else {
                console.log("Document does not exist!");
            }
        });
    }

    

    render(){
        if(this.state.isLoading){
            return(
              <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#2ECC71"/>
              </View>
            )
          }
        return (
            <PaperProvider >
                <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
                    <Appbar.BackAction color='white' onPress={this._home} />
                    <Appbar.Content color='white'
                        title="Details"
                    />
                </Appbar.Header>
                
                <Card style={styles.container}>
                    <Card.Title title={this.state.category}/>
                    <Divider/>
                    <Card.Content>
                        <Text style={styles.text}>Category: {this.state.value}</Text>
                        <Divider/>
                        <Text style={styles.text}>Money: {this.state.amount}</Text>
                        <Divider/>
                        <Text style={styles.text}>Note: {this.state.note}</Text>
                        <Divider/>
                        <Text style={styles.text}>Date: {this.state.date}</Text>
                        <Divider/>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            
                            mode="contained"
                            style={styles.button}
                            color="#F1C40F"
                            onPress={() => {
                                this.props.navigation.navigate('Edit', {
                                transid: this.state.key,
                                });
                        }}>
                            Edit
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.button}
                            color="#CC444B"
                            onPress = {
            () => this._delete(this.state.key)}
                        >Delete
                        </Button>
                    </Card.Actions>
                </Card>
            </PaperProvider>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 15,
    margin: 10,
    paddingTop:20
  },
  button: {
    fontSize: 15,
    width:'20%',
    margin:10,
    color:'white'
  },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
});
