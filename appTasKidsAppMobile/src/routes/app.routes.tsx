import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import Balance from '../pages/Balance';
import Dashboard from '../pages/Dashboard';
import DetailProduct from '../pages/DetailProduct';
import DetailTask from '../pages/DetailTask';
import SendTaskSucess from '../pages/SendTaskSucess';
import Shopping from '../pages/Shopping';
import Task from '../pages/Task';

const App = createStackNavigator();

const AppTab = createMaterialTopTabNavigator();

const AppTabRoutes: React.FC = () => (
  <AppTab.Navigator tabBarPosition="bottom" initialRouteName="Dashboard" lazy={false} tabBarOptions={{
    showIcon: true,
    showLabel: false,
  }}>

    <AppTab.Screen name="Shopping" component={Shopping} 
      options={{ tabBarIcon: () => <Icon name="shopping-bag" size={20} style={{ textAlign: 'center' }} color="black"/>}} 
    />
    <AppTab.Screen name="Dashboard" component={Dashboard} 
      options={{ tabBarIcon: () => <Icon name="home" size={20} style={{ textAlign: 'center' }} color="black"/>}} 
    />
    <AppTab.Screen name="Balance" component={Balance}
      options={{ tabBarIcon: () => <Icon name="credit-card" size={20} style={{ textAlign: 'center' }} color="black"/>}} 
    />
  </AppTab.Navigator>
);

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{
    headerShown: false,
  }}
  >
    <App.Screen name="Perfil" component={AppTabRoutes} />
    <App.Screen name="DetailTask" component={DetailTask}/>
    <App.Screen name="SendTaskSucess" component={SendTaskSucess}/>
    <App.Screen name="DetailProduct" component={DetailProduct}/>
    <App.Screen name="Task" component={Task}/>
  </App.Navigator>
);


export default AppRoutes;