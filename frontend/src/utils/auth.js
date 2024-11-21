export const fetchWithAuth = async (
  url,
  bodyContent = null,
  method = "GET",
  options = {},
) => {
  const tokenAvailable = await refreshToken();
  if (!tokenAvailable) {
    return false;
  }
  const body = bodyContent ? JSON.stringify({ content: bodyContent }) : null;
  return fetch(url, {
    method: method,
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: body,
  });
};

export const refreshToken = async (options = {}) => {
  const token = localStorage.getItem("refresh_token");
  if (!token) {
    console.log("No refresh token available");
    return false;
  }

  try {
    await fetch("http://localhost:5000/refresh-token", {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((data) => {
        localStorage.setItem("token", data.access_token);
      }),
    );
    return true;
  } catch (error) {
    console.log("Error refreshing token");
    return false;
  }
};

export const getLoggedInUser = async () => {
  const response = await fetchWithAuth("http://localhost:5000/get-user");
  if (!response) {
    return null;
  }
  const data = await response.json();
  return data.logged_in_as;
};
