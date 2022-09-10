import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { CatDetails } from './screens/CatDetails';
import AccountScreen from './screens/AccountScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface AppProps { }

interface AppState {
  readonly ready: boolean;
}

export default class App extends Component<AppProps, AppState> {

  private catListStack!: () => any;
  private catFavoritesStack!: () => any;
  private mainTabs!: () => any;
  private navigationContainer!: () => any;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      ready: false,
    };
  }

  componentDidMount(): void {
    this.CreateMainNavigation();
  }

  CreateMainNavigation(): JSX.Element {
    return (
      <Tab.Navigator>
        <Tab.Screen name="catList" component={HomeScreen}
          options={{
            headerShown: false,
            // TO DO THE FUCKING ICON
            // tabBarIcon: ({color, size}) => (
            //   <Icon name="list" size={size} color={color} />
            // ),
          }}
        />
        <Tab.Screen name="Catpedia" component={AccountScreen} />
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


