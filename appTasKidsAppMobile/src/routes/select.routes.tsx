import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SelectChildren from '../pages/SelectChildren';

const Select = createStackNavigator();

const SelectRoutes: React.FC = () => (
  <Select.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Select.Screen name="Welcome" component={SelectChildren} />
  </Select.Navigator>
);

export default SelectRoutes;
