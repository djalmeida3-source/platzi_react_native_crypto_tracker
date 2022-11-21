import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../res/colors'

export default FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  }
})