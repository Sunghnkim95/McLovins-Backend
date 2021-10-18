export function getCurrentUserToken() {
    const user = localStorage.getItem('userToken');
    return user;
  }
  export function removeCurrentUserToken() {
    localStorage.removeItem('userToken')
  }
  export function getCurrentUsername() {
    const storageUsername = JSON.parse(localStorage.getItem('myUsername'));
    return storageUsername;
  }
  export function removeCurrentUsername() {
    localStorage.removeItem('myUsername')
  }