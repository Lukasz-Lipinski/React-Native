import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/HomeScreen';
import { ExchangeScreen } from '../../screens/ExchangeScreen';
import { BottomNav } from '../BottomNav';
import { AccountScreen } from '../../screens/AccountScreen';
import { FormContext } from '../../ctx';
import { WalletsScreen } from '../../screens/WalletsScreen';
import { DashboardScreen } from '../../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='Exchange'
          component={ExchangeScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='Dashboard'
          component={DashboardScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='Account'
          component={AccountScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='Wallets'
          component={WalletsScreen}
          options={{
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
