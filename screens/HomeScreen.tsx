import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import CatApiClient, { Breed } from '../api/CatApiClient'
import BreedCard from '../components/BreedCard';

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
    public loading: boolean;

    constructor(props: CatListProps) {
        super(props);
        this.state = { breeds: [] }
        this.apiClient = new CatApiClient();
        this.loading = false;
    }

    componentDidMount(): void {
        this.loading = true;
        let breedList: BreedItem[] = new Array<BreedItem>();
        this.apiClient.getCatsBreeds().then(breeds => {
            breedList = breeds.map(breed => {
                return { id: breed.id, breed: breed }
            })
            this.setState({ breeds: breedList });
            this.loading = false;
        }).catch(error => {
            console.log("error", error)
            this.loading = false;
        })
    }

    render() {
        return (
            <View >
                <FlatList<BreedItem>
                    data={this.state.breeds}
                    renderItem={this.renderCard}
                />
            </View>
        )
    }

    renderCard = (cardInfo: ListRenderItemInfo<BreedItem>) => {
        const item = cardInfo.item;
        const breed = item.breed;

        return (
            <BreedCard
                name={breed.name}
                imageURI={breed.image?.url}
                fav={false}
                onPress={this.onBreedPressed.bind(this, breed)}
                onPressFav={this.onFavPressed.bind(this, breed)}
            />
        );
    };

    onBreedPressed(breed: Breed): void {
        console.log("pulsado: ", breed.id);
        this.props.navigation.navigate('catDetails', {breed: breed});
    }

    onFavPressed(breed: Breed): void {
        console.log("pulsado fav: ", breed.id);
        // TODO
        // this.props.navigation.navigate('breedDetail', {breed: breed});
    }
}

const styles = StyleSheet.create({})