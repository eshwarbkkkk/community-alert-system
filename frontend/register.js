// Handle form submission
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    latitude: parseFloat(document.getElementById("latitude").value),
    longitude: parseFloat(document.getElementById("longitude").value),
    role: document.getElementById("role").value,
  };

  fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to register user");
      return res.json();
    })
    .then((data) => {
      alert("✅ Registration successful! Please login.");
      window.location.href = "login.html"; // redirect to login
    })
    .catch((err) => {
      alert("❌ Registration failed. Try again.");
      console.error(err);
    });
});

// 📍 Auto-fill location using geolocation
function autoFillLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      document.getElementById("latitude").value =
        position.coords.latitude.toFixed(6);
      document.getElementById("longitude").value =
        position.coords.longitude.toFixed(6);
    },
    (error) => {
      alert("❌ Location access denied or unavailable.");
      console.error(error);
    }
  );
}

// 🌍 Map modal control
function openMapModal() {
  document.getElementById("mapModal").style.display = "block";
  setTimeout(initializeMap, 100); // small delay to ensure rendering
}

function closeMapModal() {
  document.getElementById("mapModal").style.display = "none";
}

// 🗺️ Initialize Leaflet map
let mapInstance = null;
let marker = null;

function initializeMap() {
  if (mapInstance) {
    mapInstance.invalidateSize();
    return;
  }

  mapInstance = L.map("map").setView([12.9716, 77.5946], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);

  mapInstance.on("click", function (e) {
    const lat = e.latlng.lat.toFixed(6);
    const lon = e.latlng.lng.toFixed(6);

    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;

    // Clear previous marker
    if (marker) mapInstance.removeLayer(marker);

    // Place new marker
    marker = L.marker([lat, lon])
      .addTo(mapInstance)
      .bindPopup("📍 Selected Location")
      .openPopup();

    closeMapModal();
  });
}
