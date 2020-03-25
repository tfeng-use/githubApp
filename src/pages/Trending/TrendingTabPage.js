import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  StyleSheet,
  Platform,
  DeviceEventEmitter
} from "react-native";
import { connect } from "react-redux";
import { gettrendingList } from "../../js/service";
import trendingItem from "../../components/trendingItem";
import Toast from "react-native-root-toast";
import { comUtil } from "../../js/util";
const modelName = "trending";
function TrendingTabPage(props) {
  let { tabLabel, trending, refresh, getList, status, navigation } = props;
  let [showToast, setShowToast] = useState(false);
  let [text, setText] = useState("");
  let [flag, setFlag] = useState("false");
  let { trendingTab } = trending;
  if (!trendingTab[tabLabel]) {
    let obj = {
      since: status,
      language: tabLabel
    };
    getList(obj);
  }
  let _keyExtractor = (item, index) => {
    return item.fullName + "" || index + "";
  };
  // 加载更多
  let handleLoad = () => {
    if (flag) {
      return;
    }
    let { startPage, finished = false } = trendingTab[tabLabel];
    if (finished) {
      return;
    }
    setFlag(true);
    setTimeout(() => {
      let obj = {
        language: tabLabel,
        since: status,
        startPage: startPage + 1
      };
      getList(obj);
    }, 500);
  };
  // 上拉刷新时的底部组件
  let _footer = () => {
    return comUtil.getLoadingFooter(trendingTab[tabLabel]);
  };
  function loadData(isLoading) {
    if (isLoading) {
      handleLoad();
    } else {
      refresh({
        type: tabLabel
      });
      setTimeout(() => {
        let obj = {
          language: tabLabel,
          since: status,
          startPage: 0
        };
        getList(obj);
      }, 1000); // 模拟延迟
    }
  }
  function handleScroll() {
    setFlag(false);
  }
  let showFirstLoading = true;
  if (trendingTab[tabLabel]) {
    showFirstLoading = false;
  }
  let currentList =
    (trendingTab[tabLabel] && trendingTab[tabLabel].currentList) || [];
  let refreshing = !currentList.length
    ? true
    : trendingTab[tabLabel].refreshing;

  useEffect(() => {
    let deEmitter = DeviceEventEmitter.addListener("handleItem", item => {
      navigation.navigate("DetailPage", {
        item: item
      });
    });
    return function cleanup() {
      deEmitter.remove("");
    };
  });
  return (
    <View style={styles.wrapper}>
      <View>
        <Toast
          visible={showToast}
          position={0.5}
          shadow={false}
          animation={true}
          duration={1000}
          hideOnPress={false}
        >
          {text}
        </Toast>
      </View>
      {showFirstLoading ? (
        <ActivityIndicator color="red" style={styles.indicator} size="large" />
      ) : null}
      <FlatList
        data={currentList}
        renderItem={trendingItem}
        keyExtractor={_keyExtractor}
        refreshControl={
          <RefreshControl
            title="refresh"
            size="26"
            tintColor="red"
            refreshing={refreshing}
            onRefresh={loadData}
          />
        }
        onEndReached={() => loadData(true)}
        ListFooterComponent={_footer}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => handleScroll()}
      />
    </View>
  );
}

let mapStateToProps = ({ trending }) => ({
  trending
});
let mapDispatchToProps = dispatch => ({
  getList: obj => {
    dispatch({
      type: `${modelName}/getList`,
      payload: {
        ...obj
      }
    });
  },
  refresh: obj => {
    dispatch({
      type: `${modelName}/refresh`,
      payload: {
        ...obj
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTabPage);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  indicator: {
    marginBottom: 5,
    marginTop: 20
  }
});
