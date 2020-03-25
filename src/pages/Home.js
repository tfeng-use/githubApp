/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";
import PopularPage from "./Popular/PopularPage";
import TrendingPage from "./Trending/TrendingPage";
import FavoritePage from "./FavoritePage";
import MyPage from "./MyPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
const Tab = createBottomTabNavigator();

function HomeScreen(props) {
  let { navigation, route, base } = props;
  let theme = base.theme;
  let [updateTime, changeTime] = useState(new Date().getTime());
  // 底部tab动态设置
  let dynamicBottomTab = [
    "PopularPage",
    "TrendingPage",
    "FavoritePage",
    "MyPage"
  ];
  console.disableYellowBox = true;
  // 对所有tab的集合
  let cacheBottomTab = {
    PopularPage: {
      tabBarLabel: "最热",
      component: PopularPage,
      icon: ({ color, size }) => (
        <MaterialIcons name="whatshot" color={color} size={26} />
      )
    },
    TrendingPage: {
      tabBarLabel: "趋势",
      component: TrendingPage,
      icon: ({ color, size }) => (
        <Ionicons name="md-trending-up" color={color} size={26} />
      )
    },
    FavoritePage: {
      tabBarLabel: "收藏",
      component: FavoritePage,
      icon: ({ color, size }) => (
        <MaterialIcons name="favorite" color={color} size={26} />
      )
    },
    MyPage: {
      tabBarLabel: "我的",
      component: MyPage,
      icon: ({ color, size }) => <Entypo name="user" color={color} size={26} />
    }
  };
  return (
    <Tab.Navigator
      initialRouteName={dynamicBottomTab[0]}
      tabBarOptions={{
        activeTintColor: theme
      }}
    >
      {dynamicBottomTab.map(item => {
        return (
          <Tab.Screen
            key={item}
            name={item}
            component={cacheBottomTab[item].component}
            options={{
              tabBarLabel: cacheBottomTab[item].tabBarLabel,
              tabBarIcon: cacheBottomTab[item].icon
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

let mapStateProp = ({ base }) => ({
  base
});

export default connect(mapStateProp)(HomeScreen);
