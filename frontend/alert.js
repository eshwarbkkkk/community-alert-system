// alert.js

document.getElementById("alertForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const alertData = {
    type: document.getElementById("type").value,
    description: document.getElementById("description").value,
    latitude: parseFloat(document.getElementById("latitude").value),
    longitude: parseFloat(document.getElementById("longitude").value),
    status: "OPEN",
    category: document.getElementById("category").value,
  };

  fetch("http://localhost:8080/api/alerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to create alert");
      return res.json();
    })
    .then(() => {
      alert("🚨 Emergency alert submitted!");
      const alertType = document.getElementById("type").value;
      window.location.href = `ai.html?type=${encodeURIComponent(alertType)}`;
    })

    .catch((err) => {
      alert("❌ Failed to submit alert.");
      console.error(err);
    });
});


function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById("latitude").value =
        pos.coords.latitude.toFixed(6);
      document.getElementById("longitude").value =
        pos.coords.longitude.toFixed(6);
    },
    (err) => {
      alert("❌ Unable to access location.");
      console.error(err);
    }
  );
}

let mapInstance = null;

function openMap() {
  document.getElementById("mapModal").style.display = "block";
  setTimeout(initMap, 100);
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

function initMap() {
  if (mapInstance) return;

  mapInstance = L.map("map").setView([12.9716, 77.5946], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);

  mapInstance.on("click", function (e) {
    document.getElementById("latitude").value = e.latlng.lat.toFixed(6);
    document.getElementById("longitude").value = e.latlng.lng.toFixed(6);
    alert(
      `Location set: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`
    );
    closeMap();
  });
}
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const mode = localStorage.getItem("mode");

let currentUserRole = "GUEST"; // default

if (mode === "emergency") {
  console.log("🛑 Emergency Mode Enabled");
  currentUserRole = "GUEST"; // limited access
} else if (user) {
  console.log("✅ Logged-in User Mode");
  currentUserRole = user.role;
} else {
  alert("Access denied. Please log in or use emergency mode.");
  window.location.href = "login.html";
}
