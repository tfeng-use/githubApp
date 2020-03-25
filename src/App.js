/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { create } from "dva-core";
import Models from "./models/home";
import { Provider } from "react-redux";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import HomeScreen from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import DetailPage from "./pages/DetailPage";
import {
  createCompatNavigatorFactory,
  createSwitchNavigator
} from "@react-navigation/compat";

const app = create();
// 遍历注册所有model
Models.forEach(item => {
  app.model(item);
});
// 实例初始化
app.start();
// 获取redux中的store
const store = app._store;
const Stack = createStackNavigator();
const MainNavigator = createSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    WelcomePage: { screen: WelcomePage }
  },
  {
    initialRouteName: "WelcomePage"
  }
);

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default function() {
  return (
    <Provider store={store}>
      {/* <App /> */}
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="app" component={MainNavigator} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
