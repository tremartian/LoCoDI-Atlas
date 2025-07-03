// Initialize map
const map = L.map('map').setView([20, 0], 2); // World view

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load project data
fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            if (project.coordinates) {
                L.marker(project.coordinates)
                    .addTo(map)
                    .bindPopup(`<b>${project.name}</b><br>${project.context}`);
            }
        });
    })
    .catch(error => console.error("Failed to load project data:", error));
