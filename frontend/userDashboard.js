document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").textContent = user.name;
  document.getElementById("role").textContent = user.role;

  // Show sections based on role
  if (user.role === "ADMIN") {
    document.getElementById("adminActions").style.display = "block";
  } else if (user.role === "RESPONDER") {
    document.getElementById("responderActions").style.display = "block";
  }
});

function goTo(page) {
  window.location.href = page;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
