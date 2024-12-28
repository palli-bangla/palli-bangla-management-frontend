import { authKey } from "@/constants/authKey"
import { decodedToken } from "@/utils/jwt"
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"


export const storeUserInto = (accessToken)=> {
    setToLocalStorage(authKey, accessToken)
}



export const getUserInfo = ()=> {
    const authToken = getFromLocalStorage(authKey)
  if(authToken){
    const decodedData = decodedToken(authToken)
    return decodedData;
  }
  else {
    return " ";
  }
}

export const IsUserLoggedIn= ()=> {
      const authToken = getFromLocalStorage(authKey);
      return !!authToken
}

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};



export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(authKey);
  }
  return null;
};



export const clearUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(authKey);
  }
};
