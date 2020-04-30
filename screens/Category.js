import React,{Component} from 'react';
import { Platform,StyleSheet, View } from 'react-native';
import { Appbar,Provider as PaperProvider, Text,DataTable,List,} from 'react-native-paper';
import { Button  } from 'react-native-elements';
import { TabView, SceneMap,TabBar  } from 'react-native-tab-view';
import Expenses from 'C:/Users/kalin/KManage/screens/ExpenseList';
import Incomes from 'C:/Users/kalin/KManage/screens/IncomeList';  



export default function Category()
{
  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
    { key: 'expenses', title: 'Expenses' },
    { key: 'incomes', title: 'Incomes' },
  ]);

  const renderScene = SceneMap({
  expenses: Expenses,
  incomes: Incomes,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2ECC71' }}
    style={{backgroundColor:"white"}}
    activeColor="#2ECC71" 
    inactiveColor= '#2C3E50'

    />
  );

      return (
        <PaperProvider >
        <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
        <Appbar.Content color='white'
          title="Category"
         />
      </Appbar.Header>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}  
    />  
          </PaperProvider>
        );
  }






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color:'lightgrey',},
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
});
