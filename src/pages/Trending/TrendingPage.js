import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import NavigationBar from "../../components/navigationBar";
import SelectModal from "../../components/selectModal";
import TrendingTabPage from "./TrendingTabPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

function TrendingPage(props) {
  let [currentNavText, changeCurrentNavText] = useState("今 天");
  let [currentNavType, changeCurrentNavType] = useState("daily");
  let [visibale, setVisible] = useState("false");
  let topTab = ["c"];
  // let topTab = ["c", "c#", "php", "javascript", "css"];

  useEffect(() => {
    let deEmitter = DeviceEventEmitter.addListener("select", item => {
      if (item.title !== currentNavText) {
        changeCurrentNavText(item.title);
        changeCurrentNavText(item.type);
      }
    });
    return function cleanup() {
      deEmitter.remove();
    };
  });

  let navContainer = () => {
    return (
      <View style={styles.containerWrapper}>
        <Text style={styles.container}>趋势</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginLeft: 10 }}
          onPress={() => setVisible(true)}
        >
          <View style={styles.btnWrapper}>
            <Text style={styles.container}>{currentNavText}</Text>
            <MaterialIcons style={styles.navIcon} name={"arrow-drop-down"} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView className="safe" style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#eee",
          flex: 1
        }}
      >
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
                component={() => (
                  <TrendingTabPage
                    {...props}
                    status={currentNavType}
                    tabLabel={item}
                  />
                )}
                options={{
                  tabBarLabel: item
                }}
              />
            );
          })}
        </Tab.Navigator>
        <SelectModal
          visible={visibale}
          onClose={() => setVisible(false)}
        ></SelectModal>
      </View>
    </SafeAreaView>
  );
}

export default connect()(TrendingPage);

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    color: "#fff",
    fontSize: 20,
    alignItems: "center"
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcon: {
    fontSize: 30,
    color: "#fff"
  },
  topBar: {
    // top: 40
  }
});
