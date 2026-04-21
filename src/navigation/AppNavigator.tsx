import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';

// Define the param list for the navigator
export type RootStackParamList = {
  Home: undefined;
  List: { listId: number; title: string };
  Detail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lists' }} />
        <Stack.Screen name="List" component={ListScreen} options={({ route }) => ({ title: route.params?.title ?? 'List' })} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
