const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const role = loggedInUser?.role;
const userId = loggedInUser?.id;

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/alerts")
    .then((res) => res.json())
    .then((data) => renderAlerts(data));
});

function renderAlerts(alerts) {
  const container = document.getElementById("alertContainer");
  container.innerHTML = "";

  if (alerts.length === 0) {
    container.innerHTML = "<p>No alerts found.</p>";
    return;
  }

  alerts.forEach((alert) => {
    const card = document.createElement("div");
    card.className = "alert-card";
    card.innerHTML = `
      <h3>🚨 ${alert.type}</h3>
      <p>${alert.description}</p>
      <p><strong>Status:</strong> ${alert.status}</p>
      <p><strong>Location:</strong> [${alert.latitude}, ${alert.longitude}]</p>
      <p><strong>Category:</strong> ${alert.category}</p>
      <small>🕒 ${new Date(alert.timestamp).toLocaleString()}</small><br>
      ${
        role === "RESPONDER" || role === "ADMIN"
          ? `
        <button onclick="updateStatus(${alert.id}, 'RESOLVED')">✅ Resolve</button>
        <button onclick="updateStatus(${alert.id}, 'IGNORED')">❌ Ignore</button>
      `
          : ""
      }
      ${
        role === "ADMIN"
          ? `
        <button onclick="deleteAlert(${alert.id})">🗑️ Delete</button>
      `
          : ""
      }
    `;
    container.appendChild(card);
  });
}

function updateStatus(alertId, status) {
  fetch(`http://localhost:8080/api/alerts/${alertId}/status?status=${status}`, {
    method: "PUT",
  }).then(() => location.reload());
}

function deleteAlert(alertId) {
  fetch(`http://localhost:8080/api/alerts/${alertId}`, {
    method: "DELETE",
  }).then(() => location.reload());
}
