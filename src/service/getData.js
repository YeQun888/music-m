import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'


// 获取登录信息
export const login = (phone, password) => fetch('/login/cellphone', {
  type: 'login',
  m_phone: phone,
  m_password: password,
}, 'GET');
