import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';

interface LoginScreenProps {
    readonly navigation: any;
    readonly email: string;
    readonly password: string;
    readonly isSinginScreen: boolean;
    readonly userData: any;
}

interface LoginScreenState {
    readonly email: string;
    readonly password: string;
    readonly isSinginScreen: boolean;
    readonly userData: any;
}
export default class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
    protected app: FirebaseApp = initializeApp(firebaseConfig);
    protected auth: Auth = getAuth(this.app);

    constructor(props: LoginScreenProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isSinginScreen: false,
            userData: {}
        }
    }

    componentDidMount() {
        this.getToken();
    }

    handleEmail = (text: string) => {
        this.setState({ email: text });
    };
    handlePassword = (text: string) => {
        this.setState({ password: text });
    };
    handleScreen = (state: boolean) => {
        this.setState({ isSinginScreen: state });
    }

    handleCreateUserAccount = (email: string, password: string) => {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((res) => {
                this.setState({ isSinginScreen: false });
                this.setState({ userData: JSON.stringify(res.user) });
                this.storeToken(JSON.stringify(res.user));
                this.props.navigation.replace('Home');
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    handleSignin = (email: string, password: string) => {
        signInWithEmailAndPassword(this.auth, email, password)
            .then((res) => {
                this.setState({ userData: JSON.stringify(res.user) });
                this.storeToken(JSON.stringify(res.user));
                this.props.navigation.replace('Home');
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    async storeToken(user: string) {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
        } catch (error) {
            Alert.alert(I18n.t('somethingWentWrong'));
        }
    }

    async getToken() {
        try {
            await AsyncStorage.getItem('userData').then((value) => {
                if (value !== null) {
                    this.setState({ userData: JSON.stringify(value) });
                    this.props.navigation.replace('Home');
                }
            });
        } catch (error) {
            Alert.alert(I18n.t('somethingWentWrong'));
        }
    }

    render() {
        return (
            this.state.isSinginScreen ?
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>Catpedia</Text>
                    <Image style={styles.logo} source={require('../assets/images/cat_edit.png')} />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={this.handleEmail}
                            placeholder={I18n.t('enterEmail')}>
                        </TextInput>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={this.handlePassword}
                            placeholder={I18n.t('enterPassword')}
                            secureTextEntry={true}>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.singin}
                                onPress={() => this.handleCreateUserAccount(this.state.email, this.state.password)}
                            >
                                <Text>
                                    {I18n.t('register').toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.loginText} onPress={() => this.handleScreen(false)}>
                                {I18n.t('haveAccount')}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
                :
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>Catpedia</Text>
                    <Image style={styles.logo} source={require('../assets/images/cat.png')} />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={this.handleEmail}
                            placeholder={I18n.t('enterEmail')}>
                        </TextInput>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={this.handlePassword}
                            placeholder={I18n.t('enterPassword')}
                            secureTextEntry={true}>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <Button
                                color='#EB26FF'
                                title={I18n.t('login')}
                                onPress={() => this.handleSignin(this.state.email, this.state.password)}
                            />
                            <Text style={styles.loginText} onPress={() => this.handleScreen(true)}>
                                {I18n.t('noAccount')}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
        backgroundColor: '#ffffff'
    },
    buttonContainer: {
        marginTop: 15,
    },
    singin: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EB26FF',
        borderRadius: 4,
        padding: 7,
        marginTop: 10,
        textAlign: 'center'
    },
    loginText: {
        color: '#EB26FF',
        marginTop: 25,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#771B03'
    },
    logo: {
        alignContent: 'center',
        width: 190,
        height: 180,
        marginBottom: 20
    }
})