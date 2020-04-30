import React,{Component} from 'react';
import { Platform,StyleSheet, View } from 'react-native';
import { Appbar,Provider as PaperProvider, Text, Card, Paragraph ,Divider } from 'react-native-paper';


export default class About extends Component
{

render()
  {
      return (
        <PaperProvider >
          <Appbar.Header style={{backgroundColor: '#2ECC71'}} >
            <Appbar.Content color='white'
              title="About"
            />
          </Appbar.Header>
          <Card>
            <Card.Title title="KManage" subtitle="Manage your money easily"/>
            <Card.Content>
              <Paragraph>This app is designed using react native and the database is stored in firebase.</Paragraph> 
              <Paragraph >The app lets you add income/expense transaction, edit it or delete it.
              </Paragraph>
              <Paragraph>You can add any category as per your requirement.</Paragraph>
              <Paragraph>
                For example:
                    An expense transaction may have following details,
              </Paragraph>
              <Paragraph style={{marginLeft:20}}>
                    Category:grocery
              </Paragraph>
              <Paragraph style={{marginLeft:20}}>      
                    Note:Shampoo,fruits
              </Paragraph>
              <Paragraph style={{marginLeft:20}}>      
                    Amount:200
              </Paragraph>
              <Paragraph style={{marginBottom:20}}>The app also shows the total of money credited or debited according to each category.</Paragraph> 
              <Divider/>
              <Paragraph>Designed by: Kalind Sarda</Paragraph>
            </Card.Content>
          </Card> 
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
