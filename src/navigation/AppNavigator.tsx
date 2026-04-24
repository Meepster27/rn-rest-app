import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  FamilyLove: { listId: number; title: string };
  DramaLoveStories: { listId: number; title: string };
  ComedyLoveStories: { listId: number; title: string };
  Detail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Movie Lists' }} />
        <Stack.Screen name="FamilyLove" component={ListScreen} options={{ title: 'Family Love' }} />
        <Stack.Screen name="DramaLoveStories" component={ListScreen} options={{ title: 'Drama Love Stories' }} />
        <Stack.Screen name="ComedyLoveStories" component={ListScreen} options={{ title: 'Comedy Love Stories' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
