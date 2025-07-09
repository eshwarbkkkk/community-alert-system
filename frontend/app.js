
const currentUserRole = "ADMIN";


document.addEventListener("DOMContentLoaded", () => {
  initMap();
  loadAlerts();
});

// Submit Alert
document
  .getElementById("createAlertForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const alertData = {
      type: document.getElementById("type").value,
      description: document.getElementById("description").value,
      latitude: parseFloat(document.getElementById("latitude").value),
      longitude: parseFloat(document.getElementById("longitude").value),
      status: document.getElementById("status").value,
    };

    fetch("http://localhost:8080/api/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alertData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("✅ Alert submitted!");
        document.getElementById("createAlertForm").reset();
        loadAlerts();
      })
      .catch((err) => {
        alert("❌ Failed to submit alert");
        console.error(err);
      });
  });

// Load All Alerts
function loadAlerts() {
  const list = document.getElementById("alerts");
  list.innerHTML = "";

  fetch("http://localhost:8080/api/alerts")
    .then((res) => res.json())
    .then((alerts) => {
      renderMap(alerts);

      alerts.forEach((alert) => {
        const li = document.createElement("li");
        const statusClass = alert.status?.toLowerCase() || "open";
        li.className = statusClass;

        li.innerHTML = `
          <strong>${alert.type}</strong> - ${alert.description}<br>
          <small>Status: <b>${alert.status}</b></small><br>
          <small>📍 (${alert.latitude.toFixed(3)}, ${alert.longitude.toFixed(
          3
        )})</small><br>
          <small>🕒 ${new Date(alert.timestamp).toLocaleString()}</small><br>
          ${
            ["ADMIN", "RESPONDER"].includes(currentUserRole)
              ? `
            <label for="status-${alert.id}">Change Status:</label>
            <select id="status-${alert.id}">
              <option value="OPEN" ${
                alert.status === "OPEN" ? "selected" : ""
              }>OPEN</option>
              <option value="RESOLVED" ${
                alert.status === "RESOLVED" ? "selected" : ""
              }>RESOLVED</option>
              <option value="IGNORED" ${
                alert.status === "IGNORED" ? "selected" : ""
              }>IGNORED</option>
            </select>
            <button onclick="updateAlertStatus(${alert.id})">✅ Update</button>
            <button onclick="deleteAlert(${alert.id})">🗑️ Delete</button>
          `
              : ""
          }
        `;

        list.appendChild(li);
      });
    })
    .catch((err) => {
      list.innerHTML = `<li style="color:red;">Failed to load alerts: ${err.message}</li>`;
    });
}

// Update Status
function updateAlertStatus(alertId) {
  const newStatus = document.getElementById(`status-${alertId}`).value;

  fetch(`http://localhost:8080/api/alerts/${alertId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    })
    .then(() => {
      alert("✅ Status updated!");
      loadAlerts();
    })
    .catch((err) => {
      alert("❌ Failed to update status");
      console.error(err);
    });
}

// Delete Alert
function deleteAlert(alertId) {
  if (!confirm("Are you sure you want to delete this alert?")) return;

  fetch(`http://localhost:8080/api/alerts/${alertId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        alert("🗑️ Alert deleted successfully.");
        loadAlerts();
      } else {
        throw new Error("Delete failed");
      }
    })
    .catch((err) => {
      alert("❌ Error deleting alert: " + err.message);
    });
}

let map;
let userLocationCircle = null; // To track and preserve user location

// Map Initialization
function initMap() {
  map = L.map("alertMap").setView([12.9716, 77.5946], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      map.setView([lat, lon], 14);

      // Store the circle in a variable so we can avoid deleting it later
      userLocationCircle = L.circle([lat, lon], {
        radius: 200,
        color: "blue",
      })
        .addTo(map)
        .bindPopup("📍 You are here");
    },
    (err) => {
      console.warn("Location denied, showing default.");
    }
  );
}

// Plot Alert Markers without removing user location
function renderMap(alerts) {
  if (map) {
    map.eachLayer((layer) => {
      // Remove markers but preserve tile layer and user location circle
      if (
        layer instanceof L.Marker ||
        (layer instanceof L.Circle && layer !== userLocationCircle)
      ) {
        map.removeLayer(layer);
      }
    });
  }

  alerts.forEach((alert) => {
    const marker = L.marker([alert.latitude, alert.longitude]).addTo(map);
    marker.bindPopup(`
      <strong>${alert.type}</strong><br>
      ${alert.description}<br>
      Status: ${alert.status}
    `);
  });
}

// Fetch Nearby Alerts
function fetchNearbyAlerts() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`http://localhost:8080/api/alerts/nearby?lat=${lat}&lon=${lon}`)
        .then((res) => res.json())
        .then((alerts) => displayNearbyAlerts(alerts))
        .catch((err) => {
          console.error("Error:", err);
          alert("Failed to fetch nearby alerts.");
        });
    },
    (err) => {
      console.error("Geolocation error:", err);
      alert("Location access denied.");
    }
  );
}

// Show Nearby Alerts
function displayNearbyAlerts(alerts) {
  const container = document.getElementById("nearby-alerts");
  container.innerHTML = "<h3>Nearby Alerts:</h3>";

  if (alerts.length === 0) {
    container.innerHTML += "<p>No nearby alerts.</p>";
    return;
  }

  alerts.forEach((alert) => {
    const div = document.createElement("div");
    div.className = "alert-card";
    div.innerHTML = `
      <h4>🚨 ${alert.type}</h4>
      <p>${alert.description}</p>
      <small>Status: ${alert.status}</small><br>
      <small>Location: (${alert.latitude.toFixed(3)}, ${alert.longitude.toFixed(
      3
    )})</small>
    `;
    container.appendChild(div);
  });
}
function filterAlerts() {
  const selectedStatus = document.getElementById("statusFilter").value;

  fetch("http://localhost:8080/api/alerts")
    .then((res) => res.json())
    .then((alerts) => {
      const list = document.getElementById("alerts");
      list.innerHTML = "";

      const filtered =
        selectedStatus === "ALL"
          ? alerts
          : alerts.filter((alert) => alert.status === selectedStatus);

      if (filtered.length === 0) {
        list.innerHTML = `<li>No alerts with status: ${selectedStatus}</li>`;
        return;
      }

      filtered.forEach((alert) => {
        const li = document.createElement("li");
        const statusClass = alert.status?.toLowerCase() || "open";
        li.className = statusClass;
        li.innerHTML = `
          <strong>${alert.type}</strong> - ${alert.description}<br>
          <small>Status: ${alert.status}</small><br>
          <small>📍 (${alert.latitude}, ${alert.longitude})</small><br>
          <small>🕒 ${new Date(alert.timestamp).toLocaleString()}</small>
        `;
        document.getElementById("alerts").appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error fetching alerts:", err);
    });
}

map.on("click", function (e) {
  document.getElementById("latitude").value = e.latlng.lat.toFixed(5);
  document.getElementById("longitude").value = e.latlng.lng.toFixed(5);
});
