import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import SelectRoutes from './select.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => { 

  const { user, loading, child } = useAuth();

  const state = {
    fadeAnim: new Animated.Value(0)
  };

  useEffect(() => {
    Animated.timing(state.fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000
    }).start(); 
  })


  if(loading) {
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#4DCD15', justifyContent: 'center' }}>
          <Animated.Text
            style={{ 
              fontFamily: 'RobotoSlab-Black',
              fontSize: 36,
              color: '#FFF',
              opacity: state.fadeAnim
             }}
          > go task
          </Animated.Text>          
        </View>
      </View>
    );
  }

  if(child === '' || !child || child == null) {
    if (user) {
      return <SelectRoutes />
    } else {
      return <AuthRoutes />
    }
  } else {
    if (user) {
      return <AppRoutes />
    } else {
      return <AuthRoutes />
    }
  }

}

export default Routes;