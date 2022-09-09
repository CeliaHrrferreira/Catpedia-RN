import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated
} from 'react-native'
import React, { Component } from 'react'
import CatApiClient, { Breed, BreedDetail } from '../api/CatApiClient';


interface CatDetailsProps {
  readonly navigation: any;
  readonly route: any;
}

interface CatDetailsState {
  readonly breed: Breed;
  readonly detail: BreedDetail[]
}

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const constantWidth: number = screenWidth * 0.7;

export class CatDetails extends Component<CatDetailsProps, CatDetailsState> {
  private apiClient: CatApiClient;
  private breedId: string = '';
  private scrollX: Animated.Value;


  constructor(props: CatDetailsProps) {
    super(props);
    const params = props.route.params;
    this.scrollX = new Animated.Value(0);
    this.state = {
      breed: params.breed,
      detail: []
    };
    this.apiClient = new CatApiClient();

    props.navigation.setOptions({
      title: params.breed.name,
    });
  }

  componentDidMount() {
    this.apiClient.getBreedDetail(this.state.breed.id).then(detail => {
      this.setState({ detail: detail })
    }).catch(error => {
      console.error(error);
    });
  }

  backdrop = () => {
    return (
      <View style={[styles.backdrop,
      StyleSheet.absoluteFillObject]}>
        {this.state.detail.map((item, index) => {
          const inputRange: number[] = [
            (index - 1) * constantWidth,
            index * constantWidth,
            (index + 1) * constantWidth,
          ]
          const outputRange: number[] = [0, 1, 0];
          const opacity: Animated.AnimatedInterpolation = this.scrollX.interpolate({
            inputRange,
            outputRange
          });
          return (
            <Animated.Image style={{
              height: screenHeight * 0.5,
              width: screenWidth,
              position: 'absolute',
              top: 0,
              opacity: opacity
            }} source={{ uri: item.url }} key={index} />
          )
        })}
      </View>
    )
  }
  render() {
    const breed: Breed = this.state.breed;
    const details: BreedDetail[] = this.state.detail;
    return (
      <SafeAreaView>
        <this.backdrop />
        <StatusBar hidden />
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true }
          )}
          data={details}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          decelerationRate={0}
          snapToInterval={constantWidth}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={this.renderDetail}
        ></Animated.FlatList>
      </SafeAreaView>
    )
  }

  renderDetail = (cardInfo: ListRenderItemInfo<BreedDetail>) => {
    const inputRange: number[] = [
      (cardInfo.index - 1) * constantWidth,
      cardInfo.index * constantWidth,
      (cardInfo.index + 1) * constantWidth,
    ]
    const outputRange: number[] = [0, -50, 0];
    const translateY: Animated.AnimatedInterpolation = this.scrollX.interpolate({
      inputRange,
      outputRange
    });

    return (
      <Animated.View
        style={{
          width: constantWidth,
          height: 260,
          marginHorizontal: 20,
          borderRadius: 20,
          padding: 20,
          backgroundColor: '#CD8759',
          alignItems: 'center',
          transform: [{ translateY }]
        }}
      >
        <Image style={styles.image} resizeMode="contain"
          source={{ uri: cardInfo.item.url }} />
      </Animated.View>
    )
  }
}

export default CatDetails

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: screenWidth * 1.2,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  list: {
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  backdrop: {
    height: screenHeight * 0.7,
    width: screenWidth,
    position: 'absolute',
    top: 0,
  },
  gradient: {
    height: screenHeight * 0.7,
    width: screenWidth,
    position: 'absolute',
    top: 0
  }
});