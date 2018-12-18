import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'


export const getLogin = (phone, password) => fetch('/login/cellphone', {
  phone,
  password,
},'get');


export const getPersonalized = () => fetch('/personalized', {});
