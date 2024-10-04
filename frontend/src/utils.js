export const fetchWithAuth = async (url, bodyContent=null, options = {}) => {
  await refreshToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({content: bodyContent}),
  });
};

export const refreshToken = async (options = {}) => {
  const token = localStorage.getItem("refresh_token");
  return fetch("http://localhost:5000/refresh-token", {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json().then((data) => {localStorage.setItem("token", data.access_token)}));
};

export const getLoggedInUser = async () => {
  const response = await fetchWithAuth("http://localhost:5000/get-user");
  const data = await response.json();
  return data.logged_in_as;
}
