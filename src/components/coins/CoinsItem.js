import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../res/colors';

export default function CoinsItem({ item, onPress }) {

  getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('platzi_react_native_crypto_tracker/src/assets/arrow_up.png')
    } else {
      return require('platzi_react_native_crypto_tracker/src/assets/arrow_down.png')
    }
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image 
          style={styles.imgIcon}
          source={this.getImageArrow()}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS == 'ios' ? 0 : 16,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 8,
  },
  priceText: {
    color: colors.white,
    marginRight: 12,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});
