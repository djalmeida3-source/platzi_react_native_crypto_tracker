import { Alert, FlatList, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import colors from '../../res/colors'
import Http from '../../libs/http'
import CoinMarketItem from './CoinMarketItem'
import Storage from '../../libs/storage'

export default class CoinDetailScreen extends Component {

  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  }

  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      this.setState({ isFavorite: true });
    }
  }

  removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({ isFavorite: false });
        },
        style: 'destructive'
      },
    ])
  }

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Storage.instance.get(key);
      if (favStr != null) {
        this.setState({isFavorite: true });
      }
    } catch (error) {
      console.error('Get favorites err', err);
    }
  }

  getSymbolIcon = (name) => {
    return `https://c1.coinlore.com/img/25x25/${name}.png`
  }

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      },
    ]
    return sections;
  }

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Http.instance.get(url)
    this.setState({ markets })
  }

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
    this.setState({ coin }, 
      () => {
      this.getFavorite();
    });
  }

  render() {
    const { coin, markets, isFavorite } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.iconImg} source={{ uri: this.getSymbolIcon(coin.nameid)}}/>
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable 
            onPress={this.toogleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
            ]}>
            <Text style={styles.btnFavoriteText}>{ isFavorite ? 'Remove favorite' : 'Add favorites'}</Text>
          </Pressable>
        </View>
        <SectionList 
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => 
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          }
          renderSectionHeader={({ section }) =>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
          }
        />
        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade
  },
  row: {
    flexDirection: 'row'
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    fontSize: 14,
    color: colors.white,
  },
  sectionText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  marketTitle: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteText: {
    color: colors.white
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
})
