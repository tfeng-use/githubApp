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
  findNodeHandle,
  UIManager,
  Platform,
  DeviceEventEmitter
} from "react-native";
import { connect } from "react-redux";
import { getPopularList } from "../../js/service";
import PopularItem from "../../components/popularItem";
import Toast from "react-native-root-toast";
import { comUtil } from "../../js/util";
const modelName = "popular";
let isFirst = true;
function PopularTabPage(props) {
  let {
    tabLabel,
    popular,
    refresh,
    getList,
    base,
    setIsIphonex,
    navigation
  } = props;
  let [showToast, setShowToast] = useState(false);
  let [text, setText] = useState("");
  let [flag, setFlag] = useState("false");
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
  let { popularTab } = popular;
  let safeRef;
  if (!popularTab[tabLabel]) {
    let obj = {
      q: tabLabel,
      sort: "stars"
    };
    getList(obj);
  }

  function handleShowToast(err) {
    setText(err);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }
  let _keyExtractor = (item, index) => {
    return item.id + "" || index + "";
  };
  // 加载更多
  let handleLoad = () => {
    if (flag) {
      return;
    }
    let { startPage, finished = false } = popularTab[tabLabel];
    if (finished) {
      return;
    }
    setFlag(true);
    setTimeout(() => {
      let obj = {
        type: tabLabel,
        startPage: startPage + 1
      };
      getList(obj);
    }, 500);
  };
  // 上拉刷新时的地步组件
  let _footer = () => {
    return comUtil.getLoadingFooter(popularTab[tabLabel]);
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
          q: tabLabel,
          startPage: 0
        };
        getList(obj);
      }, 1000); // 模拟延迟
    }
  }
  function handleScroll() {
    setFlag(false);
  }
  let { isIphoneX } = base;
  let _renderItem = props => {
    let { item } = props;
    return <PopularItem item={item} onSelect={() => {}}></PopularItem>;
  };
  setTimeout(() => {
    comUtil.handleSafe(isIphoneX, safeRef, setIsIphonex);
  }, 1000);
  let currentList =
    (popularTab[tabLabel] && popularTab[tabLabel].currentList) || [];
  let refreshing =
    false || (popularTab[tabLabel] && popularTab[tabLabel].refreshing);
  return (
    <View
      style={styles.wrapper}
      ref={safe => {
        safeRef = safe;
      }}
    >
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
      <FlatList
        data={currentList}
        renderItem={PopularItem}
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

let mapStateToProps = ({ popular, base }) => ({
  popular,
  base
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
  },
  setIsIphonex: bool => {
    dispatch({
      type: `base/changeIphonex`,
      payload: bool
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTabPage);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    backgroundColor: "#fff"
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
