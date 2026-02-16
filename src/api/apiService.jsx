import api from "./axiosInstance";


export const login = (payload) => {
  return api.post("auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetGuiders = (payload) => {
  return api.get("admin/users?type=2&page=1", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetGuidersDetails = (payload) => {
  return api.get(`admin/users/${payload}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GuideIdentityVerification = (payload) => {
  return api.post(`admin/users/verify-guide-identity`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GuideLicenseVerification = (payload) => {
  return api.post(`admin/users/verify-guide-licence`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const UpdateGuiderStatus = (payload) => {
  return api.post(`admin/users/verify-overall-guide-account`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
