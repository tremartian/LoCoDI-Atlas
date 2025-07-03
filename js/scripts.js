// Initialize map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fetch data
fetch('data/projects.json')
    .then(res => res.json())
    .then(data => {
        const listContainer = document.getElementById('initiative-list-items');

        data.forEach(project => {
            // Marker on map
            if (project.coordinates) {
                const marker = L.marker(project.coordinates).addTo(map);
                marker.on('click', () => showDetails(project));
            }

            // List entry
            const li = document.createElement('li');
            li.innerHTML = `<strong>${project.name}</strong> – ${project.context}`;
            li.addEventListener('click', () => {
                map.setView(project.coordinates, 6);
                showDetails(project);
            });
            listContainer.appendChild(li);
        });
    })
    .catch(err => {
        console.error("Failed to load project data:", err);
    });

// Show full details in the panel
function showDetails(project) {
    const panel = document.getElementById('initiative-details');
    panel.innerHTML = `
        <h3>${project.name}</h3>
        <p><strong>Region:</strong> ${project.region}</p>
        <p><strong>Scope:</strong> ${project.scope || '—'}</p>
        <p><strong>Context:</strong> ${project.context}</p>
        <p><strong>Technology:</strong> ${project.technology}</p>
        <p><strong>Openness:</strong> ${project.openness}</p>
        <p><strong>Focus:</strong> ${project.focus || '—'}</p>
        <p><strong>Engagement:</strong> 
            Academic: ${project.academic_engagement || '—'}, 
            Industrial: ${project.industrial_engagement || '—'}, 
            Hobbyist: ${project.hobbyist_engagement || '—'}
        </p>
        <p><a href="${project.link}" target="_blank">Official Website</a></p>
    `;
}

