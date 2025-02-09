// fetch("http://localhost:5000/auth/signup", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ email: "sam", password: "qwe" }),
// }).then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//     });
// })

// fetch("http://localhost:5000/auth/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ email: "sam6", password: "qwe" }),
// }).then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//     });
// })
//

// fetch("http://localhost:5000/cards/add", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ question: "What's the capital of Sweden?", answer: "Stockholm" }),
// }).then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//     });
// })

fetch("http://localhost:5000/cards/get-all", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
}).then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
})
