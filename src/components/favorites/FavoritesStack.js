import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './FavoritesScreen';
import colors from '../../res/colors';

const Stack = createStackNavigator();

export default FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
