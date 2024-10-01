export const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getLoggedInUser = async () => {
  const response = await fetchWithAuth("http://localhost:5000/get-user");
  const data = await response.json();
  return data.logged_in_as;
}
