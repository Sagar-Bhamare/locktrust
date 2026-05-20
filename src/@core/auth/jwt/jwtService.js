// src/@core/auth/jwt/jwtService.js
import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";

// API Base URL - make this configurable
const API_BASE_URL = "http://192.168.1.3:8006" ;
axios.defaults.baseURL = API_BASE_URL;

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();
        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }

        if (config.data instanceof FormData) {
          if (config.headers && config.headers["Content-Type"]) {
            delete config.headers["Content-Type"];
          }
        } else {
          config.headers = config.headers || {};
          config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshToken();
              if (response.data?.access_token) {
                this.setToken(response.data.access_token);
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${response.data.access_token}`;
                return axios(originalRequest);
              }
            }
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken));
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clearStorage() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('tempEmail');
    sessionStorage.removeItem('tempPassword');
  }

  logout() {
    this.clearStorage();
    window.location.href = '/login';
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }

  // Auth APIs
  login(email, password) {
    return axios.post(this.jwtConfig.loginEndpoint, { email, password })
      .then((response) => {
        if (response.data?.access_token) {
          this.setToken(response.data.access_token);
        }
        if (response.data?.refresh_token) {
          this.setRefreshToken(response.data.refresh_token);
        }
        if (response.data?.user) {
          this.setUserData(response.data.user);
        }
        return response;
      });
  }

  register(userData) {
    return axios.post(this.jwtConfig.registerEndpoint, userData);
  }

  verifyOtp(otpData, token) {
    return axios.post(`${this.jwtConfig.otpVerifyEndPoint}/${token}`, otpData);
  }

  sendOtp(email) {
    return axios.post(this.jwtConfig.sendOtpEndpoint, { email });
  }

  // User Management APIs
  getAllUsers(params) {
    return axios.get(this.jwtConfig.usersEndpoint, { params });
  }

  createUser(userData) {
    return axios.post(this.jwtConfig.creatUserEndpoint, userData);
  }

  updateUser(userId, userData) {
    return axios.put(`${this.jwtConfig.usersEndpoint}/${userId}`, userData);
  }

  deleteUser(userId) {
    return axios.delete(`${this.jwtConfig.usersEndpoint}/${userId}`);
  }

  getUserById(userId) {
    return axios.get(`${this.jwtConfig.usersEndpoint}/${userId}`);
  }

  // Role-based APIs
  getCurrentUserPermissions() {
    const user = this.getUserData();
    return user?.permissions || [];
  }

  getCurrentUserRole() {
    const user = this.getUserData();
    return user?.role || 'Admin';
  }

  createMerchant(merchantData) {
    return axios.post(this.jwtConfig.createMerchant, merchantData);
  }
}