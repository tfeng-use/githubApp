import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  findNodeHandle,
  UIManager,
  Platform
} from "react-native";
import { SAFE_TOP_IN_IOS, NAV_BAR_HEIGHT } from "./config.js";
import AsyncStorage from "@react-native-community/async-storage";
const cacheHour = 4;
export let comUtil = {
  // 获取下拉加载
  getLoadingFooter(current) {
    if (!current) {
      return null;
    }
    current = current || {};
    let { finished = false } = current;
    if (!finished) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator style={styles.indicator} size="small" />
          <Text>正在加载更多</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.footer}>
          <Text>没有更多了</Text>
        </View>
      );
    }
  },
  // 设置是否是刘海屏
  // includeBar: 是否包含bar
  handleSafe(isIphoneX, safeRef, setIsIphonex, includeBar = true) {
    if (isIphoneX !== undefined) {
      return;
    }
    if (Platform.OS !== "ios") {
      setIsIphonex(false);
      return;
    }
    if (safeRef) {
      const handle = findNodeHandle(safeRef);
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        // 48是tab的高度，44是刘海屏的刘海高度
        if (includeBar) {
          if (y - NAV_BAR_HEIGHT >= SAFE_TOP_IN_IOS) {
            setIsIphonex(true);
          } else {
            setIsIphonex(false);
          }
        }
      });
    }
  }
};

export async function getStoreMsg(url, resolve) {
  let value = await AsyncStorage.getItem(url);
  if (value) {
    value = JSON.parse(value);
    let current = new Date().getTime();
    if (current - value.timeStamp < cacheHour * 3600 * 1000) {
      resolve(value);
      return; // 这儿必须要返回，否则还是会执行下面的request
    }
  }
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  indicator: {
    marginBottom: 5
  }
});
