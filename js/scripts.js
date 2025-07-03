// Initialize map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load initiative data
fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
        const listContainer = document.getElementById('initiative-list-items');

        data.forEach(project => {
            // Add marker to map
            if (project.coordinates) {
                const marker = L.marker(project.coordinates).addTo(map);
                marker.on('click', () => showDetails(project));
            }

            // Add to list
            const li = document.createElement('li');
            li.innerHTML = `<strong>${project.name}</strong> – ${project.context}`;
            li.addEventListener('click', () => {
                map.setView(project.coordinates, 6);
                showDetails(project);
            });
            listContainer.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error loading project data:", error);
    });

// Show details in info panel
function showDetails(project) {
    const panel = document.getElementById('initiative-details');
    panel.innerHTML = `
        <h3>${project.name}</h3>
        <p><strong>Context:</strong> ${project.context}</p>
        <p><strong>Technology:</strong> ${project.technology}</p>
        <p><strong>Openness:</strong> ${project.openness}</p>
        <p><strong>Region:</strong> ${project.region}</p>
        <p><a href="${project.link}" target="_blank">Official Website</a></p>
    `;
}
