const API_URL = process.env.API_URL ?? "https://api.torque.so";

const API_ROUTES = {
  audiences: `${API_URL}/audiences`,
  campaigns: `${API_URL}/campaigns`,
  identify: `${API_URL}/identify`,
  journey: `${API_URL}/journey`,
  links: `${API_URL}/links`,
  publishers: `${API_URL}/publishers`,
  share: `${API_URL}/share`,
  users: `${API_URL}/users`,
  verify: `${API_URL}/verify`,
};

export { API_URL, API_ROUTES };
