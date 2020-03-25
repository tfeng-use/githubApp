import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";

export default function WelcomePage(props) {
  let { navigation } = props;
  // 在欢迎页面延时3s钟，然后跳转到主页面
  let timer = setTimeout(() => {
    clearTimeout(timer);
    navigation.navigate("Home");
  }, 1000);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee"
      }}
    >
      <Text> welecome to github </Text>
    </View>
  );
}
