const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userId = loggedInUser?.id;
const userRole = loggedInUser?.role;

let userLat = parseFloat(localStorage.getItem("userLat")) || 12.9716;
let userLon = parseFloat(localStorage.getItem("userLon")) || 77.5946;

document.addEventListener("DOMContentLoaded", () => {
  getCurrentLocation();
  loadNotifications();
});

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
  });
}

function loadNotifications() {
  fetch(`http://localhost:8080/api/notifications/${userId}`)
    .then((res) => res.json())
    .then((notifications) => {
      renderNotifications(notifications);
      plotMap(notifications);
    });
}

function renderNotifications(notifications) {
  const container = document.getElementById("notificationList");
  container.innerHTML = "";

  if (notifications.length === 0) {
    container.innerHTML = "<p>No notifications available.</p>";
    return;
  }

  notifications.forEach((n) => {
    const card = document.createElement("div");
    card.className = "notification-card";
    card.innerHTML = `
      <h3>${n.message}</h3>
      <small>🕒 ${new Date(n.timestamp).toLocaleString()}</small><br>
      <p>Status: ${n.seen ? "✅ Seen" : "🔔 New"}</p>
      ${
        userRole === "RESPONDER" || userRole === "ADMIN"
          ? `
        <button onclick="markSeen(${n.id})">👁️ Mark as Seen</button>
      `
          : ""
      }
      ${
        userRole === "ADMIN"
          ? `
        <button onclick="deleteNotification(${n.id})">🗑️ Delete</button>
      `
          : ""
      }
    `;
    container.appendChild(card);
  });
}

function markSeen(id) {
  fetch(`http://localhost:8080/api/notifications/${id}/seen`, {
    method: "PUT",
  }).then(() => loadNotifications());
}

function deleteNotification(id) {
  fetch(`http://localhost:8080/api/notifications/${id}`, {
    method: "DELETE",
  }).then(() => loadNotifications());
}
let map; // global map variable

function plotMap(notifications) {
  // Ensure container is rendered and has height
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  if (map) {
    map.remove(); // remove old instance
  }

  map = L.map("map").setView([userLat, userLon], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Mark current user
  const userMarker = L.marker([userLat, userLon])
    .addTo(map)
    .bindPopup("🧍 You are here")
    .openPopup();

  // Show each alert/notification
  notifications.forEach((n) => {
    if (n.latitude && n.longitude) {
      const marker = L.marker([n.latitude, n.longitude])
        .addTo(map)
        .bindPopup(`🚨 ${n.message}`);

      // Draw path line
      L.polyline(
        [
          [userLat, userLon],
          [n.latitude, n.longitude],
        ],
        { color: "red", weight: 3, dashArray: "5, 5" }
      ).addTo(map);
    }
  });
}


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLat = position.coords.latitude;
      userLon = position.coords.longitude;
    },
    (error) => {
      alert("⚠️ Unable to get location. Map may not work correctly.");
      console.error("Geolocation error:", error);
    }
  );
}

  function goToDashboard() {
    window.location.href = "userDashboard.html"; // Change this to your actual dashboard page
  }

