import React,{Component} from 'react';
import {StyleSheet, View,ActivityIndicator} from 'react-native';
import { Appbar,Provider as PaperProvider, Text,TextInput,Button ,RadioButton,Divider} from 'react-native-paper';

import DatePicker from 'react-native-datepicker'
import firebase from 'C:/Users/kalin/KManage/api/fire';

export default class Add extends Component
{
  constructor() {
    super()
    this.ref = firebase.firestore().collection('pocket')
  }  

  _home = () => this.props.navigation.push('Home');
  
  static navigationOptions = {
    headerShown: false,
  }

  ShowCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return(date + '-' + month + '-' + year);

   }

  state = {
        category: '',
        note: '',
        amount:0,
        value: 'expense',
        date:this.ShowCurrentDate(),
        isLoading: false
  }  

  handleCategory = (text) => {
        this.setState({ category: text })
  }
     
  handleNote = (text) => {
        this.setState({ note: text })
  }
    
  handleAmount = (text) => {

        this.setState({ amount: Number(text) })
  }



  addExpense = (note,category,amount,value,date) => {
    this.setState({
      isLoading: true,
    });  
    this.ref.add({
      note: note,
      category:category,
      amount:amount,
      value:value,
      date:date
    }).then(() => {
      this.setState({
        note: '',
        category: '',
        amount: 0,
        value: 'expense',
        date:this.ShowCurrentDate(),
      })
      this._home()
    });
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
      return (
        <PaperProvider >
          <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
            <Appbar.BackAction color='white' onPress={this._home} />
            <Appbar.Content
              color='white'
              title="Add  "
            />
          </Appbar.Header>
      
          <View style={styles.container}>
            <RadioButton.Group
              onValueChange={value => this.setState({ value })}
              value={this.state.value}
            >
              <View style={styles.radioinput}>
                <RadioButton.Item label="Expense" labelStyle = {styles.radioinput} value="expense" />
              
                <RadioButton.Item label="Income" labelStyle = {styles.radioinput} value="income" />
              </View>
            </RadioButton.Group>
            <Divider style={{ backgroundColor: 'blue' }} />
      
        <TextInput
          style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Category"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          mode="outlined"
          selectionColor="#2ECC71" 
          onChangeText = {this.handleCategory}
        />  
      
      <Divider style={{ backgroundColor: 'blue' }} />
      
        <TextInput
          style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Note"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          mode='outlined'
          selectionColor="#2ECC71"
          underlineColor="#2ECC71"
          onChangeText = {this.handleNote}
        />
        
        <TextInput
          style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Amount"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          mode='outlined'
          selectionColor="#2ECC71"
          underlineColor="#2ECC71"
          keyboardType='numeric'
          onChangeText = {this.handleAmount}
        />       
      
      <Divider style={{ backgroundColor: 'blue' }} />
      
      <DatePicker
        style={styles.dateinput}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        confirmBtnText="Ok"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <Divider/>
        <Button
          icon="plus"
          mode="contained"
          style={styles.input}
          color="#CC444B"
          onPress = {
            () => this.addExpense(this.state.note,this.state.category, this.state.amount,this.state.value,this.state.date)}
        >
        Add
        </Button>
            
          </View>
        </PaperProvider>
      );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    color:'blue',
    width: '30%',
    padding:10},
  fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  input:{
    width: '30%',
    padding:10
  },
  dateinput:{
    width: '30%',
    padding:10
  },
  radioinput:{
    color:"#2ECC71",
    display:'flex',
    flexDirection: "row",

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
