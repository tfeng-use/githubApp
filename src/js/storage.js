import AsyncStorage from "@react-native-community/async-storage";
import request from "./request";
import Trending from "GitHubTrending";
import { getStoreMsg } from "./util";

// 获取数据
export function getMsg(obj, requestFn) {
  return new Promise(async (resolve, reject) => {
    let sholdCache = false;
    let url;
    if (requestFn) {
      // 这儿主要针对的是trending模块
      url = obj.url;
      sholdCache = true;
      let result = await getStoreMsg(url, resolve);
      if (result) {
        resolve(JSON.parse(result));
      }
      new Trending().fetchTrending(url).then(
        async res => {
          let obj = {
            items: res,
            timeStamp: new Date().getTime()
          };
          if (sholdCache) {
            await AsyncStorage.setItem(url, JSON.stringify(obj));
          }
          resolve(obj);
        },
        err => {
          console.log("err", err);
          reject(err);
        }
      );
    } else {
      if (!obj.method || obj.method === "get") {
        url = obj.url;
        if (obj.params) {
          url = url + "?";
          for (let key in obj.params) {
            url = url + `${key}=${obj.params[key]}:`;
          }
          let last = url[url.length - 1];
          if (last === ":" || last === "?") {
            url = url.slice(0, -1);
          }
        }
        sholdCache = true;
        if (await getStoreMsg(url, resolve)) {
          return;
        }
        // 首先检测asyncStorage里面有没有对应的数据
        // let value = await AsyncStorage.getItem(url);
        // if (value) {
        //   value = JSON.parse(value);
        //   let current = new Date().getTime();
        //   if (current - value.timeStamp < cacheHour * 3600 * 1000) {
        //     resolve(value);
        //     return; // 这儿必须要返回，否则还是会执行下面的request
        //   }
        // }
      }
      request(obj).then(
        async res => {
          if (requestFn) {
            console.log("这儿是获取到的trendinhg模块的res", res);
          }
          res.timeStamp = new Date().getTime();
          if (sholdCache) {
            await AsyncStorage.setItem(url, JSON.stringify(res));
          }
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    }
  });
}
