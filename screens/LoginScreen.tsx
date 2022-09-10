import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/core';


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    let [isSinginScreen, setSigninScreen] = useState(false)

    const app: FirebaseApp = initializeApp(firebaseConfig);
    const auth: Auth = getAuth(app);

    const handleCreateUserAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setSigninScreen(false)
                console.log("sing", isSinginScreen)
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    const handleSignin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                navigation.replace('Home')
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    return (
        isSinginScreen ?
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Catpedia</Text>
                <Image style={styles.logo} source={require('../assets/images/cat_edit.png')} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Enter Email'>
                    </TextInput>
                    <TextInput
                        style={styles.inputStyle}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder='Enter Password'
                        secureTextEntry={true}>
                    </TextInput>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.singin}
                            onPress={handleCreateUserAccount}
                        >
                            <Text>
                                REGISTER
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.loginText} onPress={() => setSigninScreen(false)}>
                            Do you have an account? Click here to singin
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
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Enter Email'>
                    </TextInput>
                    <TextInput
                        style={styles.inputStyle}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder='Enter Password'
                        secureTextEntry={true}>
                    </TextInput>
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#EB26FF'
                            title="Login"
                            onPress={handleSignin}
                        />
                        <Text style={styles.loginText} onPress={() => setSigninScreen(true)}>
                            Don't have account? Click here to signup
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

    )
}

export default LoginScreen

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