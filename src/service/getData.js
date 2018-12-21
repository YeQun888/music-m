import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

//手机号登录
export const getLogin = (phone, password) => fetch('/login/cellphone', {
  phone,
  password,
}, 'get');

//推荐歌单
export const getPersonalized = () => fetch('/personalized', {});

//最新音乐
export const getNewsong = () => fetch('/personalized/newsong', {});

//热歌榜
export const getHotList = (idx) => fetch('/top/list', {
  idx,
});

//搜索
export const getSearch = (keywords) => fetch('/search', {
  keywords,
});

//热搜
export const getHotSearch = () => fetch('/search/hot', {});

//搜索建议
export const getSuggest = (keywords) => fetch('/search/suggest', {
  keywords,
});

//搜索多重匹配
export const getMultimatch = (keywords) => fetch('/search/multimatch', {
  keywords,
});
