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
  Animated,
  ScrollView
} from 'react-native'
import React, { Component } from 'react'
import CatApiClient, { Breed, BreedDetail } from '../api/CatApiClient';
import BreedCharacteristic from '../components/BreedCharacteristic';
import I18n from 'react-native-i18n';


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
            <Animated.Image style={[styles.imgBackdrop, { opacity: opacity }]} source={{ uri: item.url }} key={index} />
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
        <ScrollView>
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
          <View style={styles.details}>
            <Text style={styles.breedName}>{breed.name}</Text>
            <Text style={styles.breedDescription}>{breed.description}</Text>
            <Text style={styles.breedOrigin}>{I18n.t('origin')} {breed.origin}</Text>
            <Text style={styles.breedWeight}>{I18n.t('weight')} {breed.weight.metric} {I18n.t('kg')}</Text>
            <Text style={styles.breedCharacteristics}>{I18n.t('characteristics')}</Text>
            <BreedCharacteristic title={I18n.t('adaptability')} value={breed.adaptability} />
            <BreedCharacteristic title={I18n.t('affectionLevel')} value={breed.affection_level} />
            <BreedCharacteristic title={I18n.t('childFriendly')}  value={breed.child_friendly} />
            <BreedCharacteristic title={I18n.t('dogFriendly')}  value={breed.dog_friendly} />
            <BreedCharacteristic title={I18n.t('energyLevel')}  value={breed.energy_level} />
            <BreedCharacteristic title={I18n.t('grooming')}  value={breed.grooming} />
            <BreedCharacteristic title={I18n.t('healthIssues')}  value={breed.health_issues} />
            <BreedCharacteristic title={I18n.t('intelligence')}  value={breed.intelligence} />
            <BreedCharacteristic title={I18n.t('sheddingLevel')}  value={breed.shedding_level} />
            <BreedCharacteristic title={I18n.t('socialNeeds')} value={breed.social_needs} />
            <BreedCharacteristic title={I18n.t('strangerFriendly')}  value={breed.stranger_friendly} />
            <BreedCharacteristic title={I18n.t('vocalisation')}  value={breed.vocalisation} />
          </View>
        </ScrollView>
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
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <Image style={styles.image} resizeMode="contain"
          source={{ uri: cardInfo.item.url }} />
      </Animated.View>
    )
  }
}

export default CatDetails

const styles = StyleSheet.create({
  container: {
    width: constantWidth - 20,
    height: 260,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#CD8759',
    alignItems: 'center',
  },
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
  imgBackdrop: {
    height: screenHeight * 0.55,
    width: screenWidth,
    position: 'absolute',
    top: 0,
  },
  breedName: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#DD39AF',
    width: screenWidth,
    marginTop: 30,
    color: 'white',
    padding: 16,
    paddingBottom: 10
  },
  breedDescription: {
    fontSize: 20,
    color: '#3E3E3E',
    padding: 16,
    paddingBottom: 10
  },
  breedOrigin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3E3E',
    padding: 16,
    paddingBottom: 10
  },
  breedWeight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3E3E',
    padding: 16
  },
  breedCharacteristics: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#DD39AF',
    color: 'white',
  },
  details: {
    marginBottom: 20
  }
});