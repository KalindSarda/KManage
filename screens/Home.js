import React,{Component} from 'react';
import { SafeAreaView, View, StyleSheet,ScrollView,Dimensions,ActivityIndicator} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { FAB, Portal,DataTable ,Appbar,Provider as PaperProvider,Divider,Card,Text} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import Add from 'C:/Users/kalin/KManage/screens/Add';
import Details from 'C:/Users/kalin/KManage/screens/TransactionDetail';
import Edit from 'C:/Users/kalin/KManage/screens/EditTrans';
import firebase from 'C:/Users/kalin/KManage/api/fire';
import { YellowBox } from 'react-native';

const { height } = Dimensions.get('window');

  YellowBox.ignoreWarnings(['Setting a timer']);
 class Home extends Component
{
  
  constructor() {
    super();
    this.ref = firebase.firestore().collection('pocket');
    this.state = {
      transactions: [],
      income:0,
      expense:0,
      balance:0,
      id: '',
      screenHeight: 0,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('date','desc').onSnapshot(this.getCollection);
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
      income:this._Income(transactions),
      expense:this._Expense(transactions),
      isLoading: false,
   });
  }

  _Income=(a)=>{
    var total=0;
    for(var i in a) {
      if(a[i].value == 'income')
      {
        total = total + a[i].amount;
      } 
  }
  return total;
  }
  _Expense=(a)=>{
    var total=0;
    for(var i in a) {
      if(a[i].value == 'expense')
      {
        total = total + a[i].amount;
      } 
  }
  return total;
  }
  _Balance=(income,expense)=>{
    return (income-expense)
  }
  
  _addTrans = () => this.props.navigation.push('Add');
  static navigationOptions = {
    headerShown: false,
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  _arrayEmtyCheck = (a) =>{
    for(var key in a) {
      if(a.hasOwnProperty(key))
          return false;
  }
  return true;
}

  

render()
  {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#2ECC71"/>
        </View>
      )
    }
    if(this.state.transactions && this.state.transactions.length){
      const scrollEnabled = this.state.screenHeight > height;
    return (
        <PaperProvider >
        <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
        <Appbar.Content color='white'
          title="KManage"
         />
      </Appbar.Header>
      <ScrollView
          style={{ flex: 1 }}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
      <Card >
      <DataTable>
        <DataTable.Header   >
          <DataTable.Title style={{alignContent:'center',paddingLeft:30,fontWeight: "bold",}}>Income</DataTable.Title>
          <DataTable.Title style={{alignContent:'center',paddingLeft:30,fontWeight: "bold",}}>Expenses</DataTable.Title>
          <DataTable.Title style={{alignContent:'center',paddingLeft:30,fontWeight: "bold",}}>Balance</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row >
          <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>{this.state.income}</DataTable.Cell>
          <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>{this.state.expense}</DataTable.Cell>
          <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>{this._Balance(this.state.income,this.state.expense)}</DataTable.Cell>
        </DataTable.Row>
        </DataTable>
        </Card>
        
          <View style={styles.container}>
          {
          this.state.transactions.map((item, i) => {
              return (
          <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.category}
                  subtitle={item.note}
                  rightTitle={<Text>{item.amount}</Text>}
                  rightSubtitle={item.date}
                  onPress={() => {
                    this.props.navigation.navigate('Details', {
                      transid: item.key,
                    });
                  }}
                  />
                  );
            })
          }
         
         </View>
         </ScrollView>
            
         <Portal>
         <FAB
    style={styles.fab}
    color='#f0edf6'
    icon="plus"
    onPress={this._addTrans}
  />
         </Portal>
         </PaperProvider>  
        );
  }
  else
  {
    return (
      <PaperProvider >
      <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
        <Appbar.Content color='white'
          title="KManage"
         />
      </Appbar.Header>
    <Card >
    <DataTable>
      <DataTable.Header   >
        <DataTable.Title style={{alignContent:'center',paddingLeft:30}}>Income</DataTable.Title>
        <DataTable.Title style={{alignContent:'center',paddingLeft:30}}>Expenses</DataTable.Title>
        <DataTable.Title style={{alignContent:'center',paddingLeft:30}}>Balance</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row >
        <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>0</DataTable.Cell>
        <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>0</DataTable.Cell>
        <DataTable.Cell style={{alignContent:'center',paddingLeft:30}}>0</DataTable.Cell>
      </DataTable.Row>
      </DataTable>
      </Card>
     
        <View style={styles.emptycontainer}>
          <Icon style={{color:'lightgrey',justifyContent:'center',margin:10}} size={100} name={'md-add-circle-outline'}/>
          <Divider/>
          <Text style={styles.emptyText}  >No Transactions done.</Text>
          <Text style={styles.emptyText}  >Click on add to add a new transaction</Text>
          
         </View> 
          <Portal>
         <FAB
    style={styles.fab}
    color='#f0edf6'
    icon="plus"
    onPress={this._addTrans}
  />
         </Portal>
         </PaperProvider>  
        );
    
  }
    }    
    
}

const AppNavigator = createStackNavigator(  
  {  
      Home: Home,  
      Add: Add,
      Details:Details,
      Edit:Edit,  
    },  
  {  
      initialRouteName: "Home"  
  },
  {
    headerMode: 'none',
  }  
);



export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptycontainer: {
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
    backgroundColor:'#D35400',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    
  },
  table:{
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    fontWeight:"bold",
    color:'black'
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

