import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import NavigationBar from "../components/navigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";

export default function DetailPage(props) {
  let { route } = props;
  let { params } = route;
  let { item } = params;
  let right = () => {
    return (
      <View style={styles.right}>
        <TouchableOpacity>
          <FontAwesome style={styles.rightIcon} name={"star-o"} />
        </TouchableOpacity>
        <Ionicons style={styles.rightIcon} name={"md-share"} />
      </View>
    );
  };
  let navContainer = () => {
    return (
      <View style={styles.containerWrapper}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.container}>
          {item.fullName || item.full_name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1
        }}
      >
        <NavigationBar
          {...props}
          container={navContainer()}
          showStatusBar={false}
          showLeft={true}
          showRight={true}
          right={right()}
        />
        <WebView
          startInLoadingState={true}
          source={{
            uri: `https://github.com/${item.fullName || item.full_name}`
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerWrapper: {
    color: "#fff"
  },
  container: {
    color: "#fff",
    fontSize: 20
  },
  fullName: {},
  right: {
    flexDirection: "row"
  },
  rightIcon: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10
  }
});
