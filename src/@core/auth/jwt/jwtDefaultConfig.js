// src/@core/auth/jwt/jwtDefaultConfig.js

export default {
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
  tokenType: "Bearer",

  // Auth Endpoints
  loginEndpoint: "/auth/login",
  registerEndpoint: "/auth/register",
  refreshEndpoint: "/auth/refresh-token",
  logoutEndpoint: "/auth/logout",
  meEndpoint: "/auth/me",
  sendOtpEndpoint: "/auth/send-otp",
  otpVerifyEndPoint: "/auth/verify-otp",

  // User Endpoints
  creatUserEndpoint: "/auth/allUserCreate",
  usersEndpoint: "/users",
  createMerchant:"/auth/createMerchant",

  // Role-based Endpoints
  rolesEndpoint: "/roles",
  permissionsEndpoint: "/permissions",
};