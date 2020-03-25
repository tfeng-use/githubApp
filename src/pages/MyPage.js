import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";

export default function MyPage(props) {
  let { changeTheme } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink"
      }}
    >
      <Text> 我的页面 </Text>
      <Button title="修改主题Pink" onPress={() => changeTheme("red")}></Button>
    </View>
  );
}
