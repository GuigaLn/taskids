import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Register from '../pages/Register';

import InitialInformation from '../pages/InitialInformation';
import SecondInfomation from '../pages/SecondInformation';
import SingIn from '../pages/SignIn';
import Welcome from '../pages/Welcome';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}
    initialRouteName="Welcome">
    <Auth.Screen name="Welcome" component={Welcome} />
    <Auth.Screen name="InitialInformation" component={InitialInformation} />
    <Auth.Screen name="SecondInfomation" component={SecondInfomation} />
    <Auth.Screen name="SingIn" component={SingIn} />
    <Auth.Screen name="Register" component={Register} />
  </Auth.Navigator>
);

export default AuthRoutes;
