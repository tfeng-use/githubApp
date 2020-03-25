import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PopularTabPage from "./PopularTabPage";
import NavigationBar from "../../components/navigationBar";
const Tab = createMaterialTopTabNavigator();

function PopularPage(props) {
  let topTab = ["java", "android", "ios", "react", "react native", "php"];
  let navContainer = () => {
    return (
      <View style={styles.containerWrapper}>
        <Text style={styles.container}>最热</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavigationBar
        container={navContainer()}
        showStatusBar={false}
        showLeft={false}
        showRight={false}
      />
      <Tab.Navigator
        initialRouteName={topTab[0]}
        style={styles.topBar}
        tabBarOptions={{
          tabStyle: {
            minWidth: 50
          },
          scrollEnabled: true,
          style: {
            backgroundColor: "#678"
          },
          labelStyle: {
            color: "#eee"
          },
          indicatorStyle: {
            // 指示器样式
            backgroundColor: "#fff"
          }
        }}
      >
        {topTab.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item}
              component={() => <PopularTabPage {...props} tabLabel={item} />}
              options={{
                tabBarLabel: item.toLowerCase()
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default PopularPage;

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    fontSize: 20,
    alignItems: "center"
  },
  topBar: {}
});
