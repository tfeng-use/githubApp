import { getMsg } from "./storage";

export function getPopularList(obj) {
  let requestObj = {
    url: "https://api.github.com/search/repositories",
    params: obj
  };
  return getMsg(requestObj);
}
export function getTrendingList(language, obj) {
  let { since } = obj;
  let requestObj = {
    url: `https://github.com/trending/${language}?since=${since}`
  };
  return getMsg(requestObj, true);
}
