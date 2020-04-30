import React,{Component} from 'react';
import { Platform,StyleSheet, View,ScrollView,Dimensions,ActivityIndicator} from 'react-native';
import {Provider as PaperProvider,TextInput,Button , Text,FAB,Portal,Modal,Divider } from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'C:/Users/kalin/KManage/api/fire';

const { height } = Dimensions.get('window');


export default class Incomes extends Component
{
  constructor() {
    super();
    this.ref = firebase.firestore().collection('pocket');
    this.state = {
      transactions: [],
      income:[],
      screenHeight: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const transactions = [];
    querySnapshot.forEach((res) => {
      const { value, category, note,amount,date} = res.data();
      transactions.push({
        key: res.id,
        res,
        value,
        category,
        note,
        amount,
        date
      });
    });
    this.setState({
      transactions,
      income:this._IncomeList(transactions),
      isLoading: false,
   });
  }

  removeDuplicate = (array, key,value) => {
    let lookup = {};
    let result = [];
    for(let i=0; i<array.length; i++) {
      if(array[i].value == value){
        if(!lookup[array[i][key]]){
            lookup[array[i][key]] = true;
            result.push(array[i]);
        }
    }
    }
    return result;
}

  _IncomeList = (a) =>{
    var sum =[1000];
    var income = [];
    var key;
    for(var i=0;i<1000;i++){
      sum[i]=0;
    }
    income=this.removeDuplicate(a, 'category','income');

    for(var i in a){
      if(a[i].value == 'income'){
        key=income.findIndex(function(e) {
          return e.category == (a[i].category);
        });
        
        if(key>-1){
          sum[key]=sum[key]+a[i].amount;
          income[key]={
            category:income[key].category,
            amount:sum[key]
          }
        }
        else{
          sum[i]=sum[i]+a[i].amount;
          income[i]={
            category:a[i].category,
            amount:sum[i]
          }
        }
      }
    }
    return income;
  }


  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render()
  {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#2ECC71"/>
        </View>
      )
    }
    if(this.state.income && this.state.income.length){
      const scrollEnabled = this.state.screenHeight > height;
      return (
        <PaperProvider >
          <ScrollView
          style={{ flex: 1 }}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View>
          {
          this.state.income.map((item, i) => {
              return (
          <ListItem
                  key={i}
                  bottomDivider
                  title={item.category}
                  rightTitle={<Text>{item.amount}</Text>}
                  />
                  );
            })
          }   
         </View>
        </ScrollView>   
        </PaperProvider>
        );
    }
    else
    {
      return (
        <PaperProvider >
       
          <View style={styles.emptycontainer}>
            <Icon style={{color:'lightgrey',justifyContent:'center',margin:10}} size={100} name={'md-add-circle-outline'}/>
            <Divider/>
            <Text style={styles.emptyText}  >No Transactions done.</Text>
            <Text style={styles.emptyText}  >Go to Home screen and click on add to add a new transaction</Text>
            
           </View> 
           </PaperProvider>
    );
  }
    
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },emptycontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color:'lightgrey',
  },
    fab: {
      backgroundColor:'#EA526F',
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
});