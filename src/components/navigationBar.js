import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
  DeviceInfo,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  SAFE_TOP_IN_IOS,
  BAR_HEIGHT_IN_ANDROID,
  STATUS_BAR_HEIGHT_IN_IOS,
  STATUS_BAR_HEIGHT_IN_ANDROID
} from "../js/config";

export default function NavigationBar(props) {
  let {
    left,
    right,
    showStatusBar,
    statusBar,
    showLeft,
    showRight,
    container,
    navigation
  } = props;
  let handleLeft = () => {
    navigation && navigation.goBack();
  };
  let getLeft = () => {
    if (showLeft) {
      return (
        <View style={styles.leftIconContainer}>
          {left || (
            <TouchableOpacity
              onPress={() => {
                handleLeft();
              }}
            >
              <Ionicons
                style={styles.leftIcon}
                name={"ios-arrow-back"}
              ></Ionicons>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return null;
    }
  };
  let getRight = () => {
    if (showRight) {
      return (
        <View style={styles.rightIconContainer}>
          {right || <FontAwesome style={styles.rightIcon} name={"star-o"} />}
        </View>
      );
    } else {
      return null;
    }
  };
  let getContainer = () => {
    if (typeof container === "string") {
      return (
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {container}
        </Text>
      );
    } else {
      return container;
    }
  };
  return (
    <View>
      {showStatusBar ? (
        <View style={styles.statusBar}>
          <StatusBar {...statusBar} />
        </View>
      ) : null}
      <View style={styles.barWrapper}>
        <View>{getLeft()}</View>
        <View style={styles.titleContainer}>{getContainer()}</View>
        <View>{getRight()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    backgroundColor: "rgb(70, 86, 105)",
    height: Platform.OS === "ios" ? SAFE_TOP_IN_IOS : BAR_HEIGHT_IN_ANDROID,
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 40,
    top: 0,
    right: 40,
    bottom: 0
  },
  title: {
    color: "#fff",
    fontSize: 20
  },
  statusBar: {
    height:
      Platform.OS === "ios"
        ? STATUS_BAR_HEIGHT_IN_IOS
        : STATUS_BAR_HEIGHT_IN_ANDROID
  },
  leftIconContainer: {
    marginLeft: 15
  },
  rightIconContainer: {
    marginRight: 15
  },
  leftIcon: {
    padding: 10,
    color: "#fff",
    fontSize: 20
  },
  rightIcon: {
    color: "#fff",
    fontSize: 20
  }
});
