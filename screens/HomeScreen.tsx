import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import CatApiClient, { Breed } from '../api/CatApiClient'
import BreedCard from '../components/BreedCard';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BreedItem {
    readonly id: string;
    readonly breed: Breed;
}

export interface CatListProps {
    readonly navigation: any;
}

interface BreedListState {
    readonly breeds: BreedItem[];
}

export default class HomeScreen extends Component<CatListProps, BreedListState> {

    protected apiClient: CatApiClient;

    constructor(props: CatListProps) {
        super(props);
        this.state = { breeds: [] }
        this.apiClient = new CatApiClient();
    }

    componentDidMount(): void {
        let breedList: BreedItem[] = new Array<BreedItem>();
        this.apiClient.getCatsBreeds().then(breeds => {
            breedList = breeds.map(breed => {
                return { id: breed.id, breed: breed }
            })
            this.setState({ breeds: breedList });
        }).catch(error => {
            console.log("error", error);
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View >
                    <FlatList<BreedItem>
                        data={this.state.breeds}
                        renderItem={this.renderCard}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderCard = (cardInfo: ListRenderItemInfo<BreedItem>) => {
        const item = cardInfo.item;
        const breed = item.breed;

        return (
            <BreedCard
                name={breed.name}
                imageURI={breed.image?.url}
                onPress={this.onBreedPressed.bind(this, breed)}
            />
        );
    };

    onBreedPressed(breed: Breed): void {
        this.props.navigation.navigate('catDetails', { breed: breed });
    }
}

const styles = StyleSheet.create({})