const url = "/api/v1";
// eslint-disable-next-line
export default {
  register: async (user) => {
    const res = await fetch(`${url}/users/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  login: async (user) => {
    const res = await fetch(`${url}/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (res.status !== 401) return res.json().then((data) => data);
    // // We get the user data
    // else return { isAuthenticated: false };
    const data = await res.json();
    return data;
  },
  logout: async () => {
    const res = await fetch(`${url}/users/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  // Sync backend and front end
  isAuthenticated: async () => {
    const res = await fetch(`${url}/users/auth`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status !== 401) return res.json().then((data) => data);
    else return { isAuthenticated: false, user: {} };
  },
  getHomeFeed: async () => {
    const res = await fetch(`${url}/users/home`);
    const data = await res.json();
    return data;
  },
};
