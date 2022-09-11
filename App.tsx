import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { CatDetails } from './screens/CatDetails';
import AccountScreen from './screens/AccountScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface AppProps { }

export default class App extends Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount(): void {
    this.CreateMainNavigation();
  }

  CreateMainNavigation(): JSX.Element {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Cats" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="md-layers" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Catpedia" component={AccountScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="logo-octocat" size={size} color={color} />
          )
        }}/>
      </Tab.Navigator>
    );
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={this.CreateMainNavigation} />
          <Stack.Screen name="catDetails" component={CatDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


