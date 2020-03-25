import React, { useState } from "react";
import request from "../js/request";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button
} from "react-native";
import { getPopularList } from "../js/service";

export default function FavoritePage(props) {
  let [msg, changeMsg] = useState("");
  let getMsg = () => {
    let obj = {
      q: "javascript"
    };
    getPopularList(obj)
      .then(res => {
        // changeMsg(JSON.stringify(res));
        // console.log("这儿是获取的数据", res);
      })
      .catch(err => {
        // changeMsg(JSON.stringify(err));
        console.log("报错了", err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink"
      }}
    >
      <Text> 收藏页面 </Text>
      <Button title="获取信息" onPress={() => getMsg()}></Button>
      <Text> 这儿是返回的数据 </Text>
      {/* <Text> {msg} </Text> */}
    </View>
  );
}
