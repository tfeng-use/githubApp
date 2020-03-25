import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";

export default function FlatListScreen() {
  let [list, setList] = useState([
    "北京",
    "上海",
    "深圳",
    "广州",
    "成都",
    "杭州",
    "厦门",
    "大连",
    "重庆",
    "昆明",
    "武汉",
    "西安",
    "青海"
  ]);
  let [refresh, setRefresh] = useState(false);
  let [finish, setFinish] = useState(false);
  let _renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    );
  };
  let _keyExtractor = (item, index) => index + "";
  function loadData(isLoading) {
    if (isLoading) {
      handleLoad();
    } else {
      setRefresh(true);
      setTimeout(() => {
        let listTemp = list;
        listTemp = listTemp.reverse();
        listTemp = listTemp.slice(0, 13);
        setList(listTemp);
        setRefresh(false);
        setFinish(false);
      }, 1000);
    }
  }
  function handleLoad() {
    if (finish) {
      return;
    } else {
      setTimeout(() => {
        let listTemp = list || [];
        listTemp = [...listTemp, ...listTemp];
        setList(listTemp);
        if (listTemp.length > 30) {
          setFinish(true);
        }
      }, 1000);
    }
  }
  function _footer() {
    if (!finish) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator
            style={styles.indicator}
            size="small"
            color="#0000ff"
          />
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
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={list}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        // refreshing={refresh}
        // onRefresh={loadData}
        refreshControl={
          <RefreshControl
            title="refresh"
            size="26"
            tintColor="red"
            refreshing={refresh}
            onRefresh={loadData}
          />
        }
        onEndReached={() => loadData(true)}
        ListFooterComponent={_footer}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  item: {
    height: 120,
    alignSelf: "stretch",
    backgroundColor: "#999",
    top: 10,
    bottom: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  indicator: {
    marginBottom: 5
  }
});
