document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        const response = await axios.post("/login", { email, password });
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Login successful!");
      } catch (error) {
        console.error("Login error:", error.response.data.message);
        alert("Login failed! Please check your credentials.");
      }
    });

  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get("/worko/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      const userDataContainer = document.getElementById("userData");
      userDataContainer.innerHTML = JSON.stringify(userData, null, 2);
    } catch (error) {
      console.error("User data fetch error:", error.response.data.message);
    }
  }
});
