import React from "react";
import {
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  findNodeHandle,
  UIManager,
  Platform,
  DeviceEventEmitter
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  SAFE_TOP_IN_IOS,
  BAR_HEIGHT_IN_ANDROID,
  STATUS_BAR_HEIGHT_IN_IOS,
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT_IN_ANDROID
} from "../js/config";
import { connect } from "react-redux";

function SelectModal(props) {
  let {
    visible,
    onClose,
    selectList = [
      {
        title: "今天",
        type: "daily"
      },
      {
        title: "本周",
        type: "weekly"
      },
      {
        title: "本月",
        type: "monthly"
      }
    ],
    base
  } = props;
  let { isIphoneX } = base;

  let handleSelect = item => {
    DeviceEventEmitter.emit("select", item);
    onClose();
  };
  let selectBar = selectList.map((item, index) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.selectItem}
          activeOpacity={0.7}
          onPress={() => handleSelect(item)}
        >
          <View>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        {index !== selectList.length - 1 ? (
          <View style={styles.line}></View>
        ) : null}
      </View>
    );
  });
  return (
    <Modal
      visible={visible}
      style={styles.modal}
      animationType="fade"
      transparent={true}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.containerWrapper}
        onPress={() => onClose()}
      >
        <View
          style={{
            position: "relative",
            top:
              Platform.OS === "ios"
                ? isIphoneX
                  ? SAFE_TOP_IN_IOS + NAV_BAR_HEIGHT
                  : NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT_IN_IOS
                : BAR_HEIGHT_IN_ANDROID + STATUS_BAR_HEIGHT_IN_ANDROID
          }}
        >
          <MaterialIcons name={"arrow-drop-up"} style={styles.icon} />
          <View style={styles.itemListWrapper}>{selectBar}</View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .6)",
    alignItems: "center"
    // justifyContent: "center"
  },
  itemListWrapper: {
    width: 100,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#ccc"
  },
  selectItem: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  line: {
    height: 0.5,
    backgroundColor: "#999"
  },
  itemText: {
    fontSize: 20
  },
  icon: {
    color: "#fff",
    position: "absolute",
    left: 26,
    top: -28,
    fontSize: 50
  }
});
let mapStateToProps = ({ base }) => ({
  base
});
export default connect(mapStateToProps)(SelectModal);
