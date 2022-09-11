import { Image, Text, View, NativeModules, Button, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import CatApiClient, { RandomItem } from '../api/CatApiClient';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { Auth, getAuth } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AccountProps {
  readonly navigation: any;
}

interface AccountState {
  readonly randomCat: RandomItem[];
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export default class AccountScreen extends Component<AccountProps, AccountState> {
  protected apiClient: CatApiClient;

  constructor(props: AccountProps) {
    super(props);
    this.state = { randomCat: [] }
    this.apiClient = new CatApiClient();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
          onPress={this.onPress.bind(this, 'jpg,png')}>
          <Text style={styles.textButton}>Get a random image of cats!</Text>
          </TouchableOpacity>
        <View style={styles.imgContainer}>
          {this.state?.randomCat[0]?.url ?
            <Image source={{ uri: this.state.randomCat[0].url }} style={styles.image} />
            :
            <Image source={require('../assets/images/cat.png')} style={styles.image} />}
        </View>
        <View style={styles.logoutContainer}>
          <Image source={require('../assets/images/cat_angry.png')} style={styles.imgLogout} />
          <Text style={styles.textLogout}>Log Out</Text>
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={this.handleLogout.bind(this)}
        >
          <Text>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  onPress(type: string): void {
    NativeModules.GetGifManager.configureUrl(type, (error: any, result: string) => {
      if (error) {
        return;
      } else {
        this.apiClient.getRandomCat(result).then(cat => {
          this.setState({ randomCat: cat });
        }).catch(error => {
          Alert.alert(error.message);
        });
      }
    });
  }
  handleLogout() {
    auth.signOut().then(() => {
      AsyncStorage.removeItem('userData');
      this.props.navigation.navigate('Login');
    }).catch(error =>
      Alert.alert(error.message));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#DD39AF',
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333333',
    fontWeight: 'bold'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#CD8759',
    width: '100%',
    borderRadius: 30,
    padding: 10
  },
  image: {
    margin: 16,
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  logoutContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textLogout: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#333333',
    fontWeight: 'bold'
  },
  logout: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EB26FF',
    borderRadius: 4,
    padding: 7,
    marginTop: 10,
    textAlign: 'center'
  },
  imgLogout: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  }
});
