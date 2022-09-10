import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings';

interface BreedCharacteriscticsProps {
  readonly title: string;
  readonly value: number;
}

export class BreedCharacteristic extends Component<BreedCharacteriscticsProps>{
  render() {
    return (
      <View style={styles.characteristic}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Rating
          type='star'
          ratingCount={5}
          startingValue={this.props.value}
          readonly={true}
          tintColor='#f2f2f2'
          style={styles.rating}
          imageSize={30}
        />
      </View>
    )
  }
}

export default BreedCharacteristic

const styles = StyleSheet.create({
  characteristic: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#3E3E3E',
    paddingTop: 16
  },
  rating: {
    height: 16
  }
});
