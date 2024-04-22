import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token,rememberMe) {  
  if(rememberMe){
    return Cookies.set(TokenKey, token, { expires: Config.TokenExpireTime })//记住我，给定过期时间
  }
  return Cookies.set(TokenKey, token)//关闭浏览器失效
}

