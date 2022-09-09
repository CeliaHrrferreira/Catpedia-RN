import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface BreedCardProps {
    readonly onPress: () => void;
    readonly onPressFav: () => void;
    readonly imageURI?: string;
    readonly name: string;
    readonly fav: boolean;
}

let screenWidth: number = Dimensions.get('window').width;

export default class BreedCard extends Component<BreedCardProps> {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                underlayColor="lightgray"
                style={styles.mainContainer}>
                <View style={styles.cardTemplate}>
                    {this.props.imageURI ?
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{ uri: this.props.imageURI }}
                        />
                        :
                        <Image
                            style={styles.imageDefault}
                            resizeMode="contain"
                            source={require('../resources/cat.png')}
                        />
                    }

                    <View style={styles.nameContainer}>
                        <Text style={styles.text}>{this.props.name}</Text>
                        <TouchableHighlight
                        underlayColor="white"
                        onPress={this.props.onPressFav}>
                        {this.props.fav ?
                            <Image
                                style={styles.icon}
                                resizeMode="contain"
                                source={require('../resources/full_heart.png')} />
                            :
                            <Image
                                style={styles.icon}
                                resizeMode="contain"
                                source={require('../resources/empty_heart.png')} />}
                            </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 16
    },
    cardTemplate: {
        margin: 10,
    },
    image: {
        width: screenWidth - 30,
        minHeight: 250,
        resizeMode: 'contain'
    },
    imageDefault: {
        width: 'auto',
        height: 250,
        resizeMode: 'contain'
    },
    nameContainer: {
        width: screenWidth - 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: "#CD8759",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    text: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    icon: {
        width: 25,
        height: 25
    }
});