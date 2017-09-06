class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, other) {
    localStorage.setItem('token', token);
    if(other.user != null){
      localStorage.setItem('user', other.user.name);
      localStorage.setItem('email', other.user.email);
    }
    
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }
  
  /**
   * Get the user object.
   *
   * @returns {string}
   */

  static getUser() {
    return localStorage.getItem('user');
  }
  /**
   * Get the user object.
   *
   * @returns {string}
   */

  static getUserEmail() {
    return localStorage.getItem('email');
  }
}

export default Auth;
