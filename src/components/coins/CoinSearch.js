import { StyleSheet, View, TextInput, Platform } from 'react-native'
import React, { Component } from 'react'
import colors from '../../res/colors'

export default class CoinSearch extends Component {

  state = {
    query: ''
  }

  handleText = (query) => {
    this.setState({ query });

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  } 

  render() {

    const { query } = this.state;

    return (
      <View>
        <TextInput 
          style={[
            styles.textInput,
            Platform.OS == 'ios' ?
              styles.textInputIOS :
              styles.textInputAndroid
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder='Search coin' 
          placeholderTextColor={colors.white}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: colors.white,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  },
})