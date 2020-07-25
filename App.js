import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ReadingScreen from './Screens/ReadingScreen';
import WritingScreen from './Screens/WritingScreen';


export default class App extends React.Component {
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const TabNavigator =createBottomTabNavigator({
  ReadScreen:{screen:ReadingScreen},
  WriteScreen:{screen:WritingScreen},

},
{defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const routeName=navigation.state.routeName;
  if(routeName=="Reading"){
 
  }
  else if(routeName=="Writing"){
   
   }
  }
  
})
})
const AppContainer=createAppContainer(TabNavigator)
