fetch("http://localhost:5000/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "sam4", password: "qwe" }),
}).then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
})
