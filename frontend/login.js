// login.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const identifier = document.getElementById("emailOrPhone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!identifier || !password) {
    showError("❗ Please enter both email/phone and password.");
    return;
  }

  const loginData = {
    email: identifier,
    password: password,
  };

  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then((user) => {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("mode", "user");
      alert("✅ Login successful!");
      window.location.href = "userDashboard.html"; // update as per your routing
    })
    .catch((err) => {
      console.error("Login failed:", err);
      showError("❌ Invalid email/phone or password.");
    });
});

function showError(message) {
  document.getElementById("errorMsg").textContent = message;
}

// Emergency mode handler
function setEmergencyMode() {
  localStorage.setItem("mode", "emergency");
}

