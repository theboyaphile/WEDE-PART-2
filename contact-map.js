document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map');

  if (!mapContainer || typeof L === 'undefined') {
    return;
  }

  const map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true
  }).setView([-29.84, 30.98], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const locations = [
    {
      name: 'Central Municipal Center',
      coords: [-29.8579, 31.0244],
      address: '124 Main Street, Central City, 3201',
      phone: '+27 33 123 4567'
    },
    {
      name: 'Westside Regional Center',
      coords: [-29.8176, 30.9434],
      address: '88 Westridge Avenue, Westville, 3209',
      phone: '+27 33 987 6543'
    }
  ];

  const bounds = L.latLngBounds([]);

  locations.forEach((location) => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`
      <div style="min-width:180px;">
        <strong>${location.name}</strong><br>
        ${location.address}<br>
        ${location.phone}
      </div>
    `);
    bounds.extend(location.coords);
  });

  if (locations.length) {
    map.fitBounds(bounds.pad(0.25));
  }
});
