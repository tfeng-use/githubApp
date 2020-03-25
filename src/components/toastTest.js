import React from "react";
import { View, Button, Text } from "react-native";
import Toast from "react-native-root-toast";

export default function test(props) {
  let { count } = props;
  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
}
