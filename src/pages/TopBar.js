import "react-native-gesture-handler";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";
import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import HomeScreen from './Home'
import DetailsScreen from './Detail'

export default function MyTabs() {
  return ( 
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name = "Home" component = {
        HomeScreen
      }/> 
      <Tab.Screen name = "Detail" component = {
        DetailsScreen
      }/> 
    </Tab.Navigator>
  );
}