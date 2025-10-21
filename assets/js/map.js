let map;
let rutasDibujadas = [];

document.addEventListener("DOMContentLoaded", function () {
  inicializarMapa();
  configurarEventosTabla();
});

function inicializarMapa() {
  map = L.map("map", {
    center: [-32.5, -56.0],
    zoom: 7,
    minZoom: 7,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);
}

function dibujarRutaUnica(
  origenLat,
  origenLng,
  destinoLat,
  destinoLng,
  origen,
  destino
) {
  const marcadorOrigen = L.circleMarker([origenLat, origenLng], {
    radius: 10,
    fillColor: "#2ecc71",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
  }).addTo(map);
  marcadorOrigen.bindPopup(`<b>Origen:</b> ${origen}`).openPopup();

  const marcadorDestino = L.circleMarker([destinoLat, destinoLng], {
    radius: 10,
    fillColor: "#e74c3c",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
  }).addTo(map);
  marcadorDestino.bindPopup(`<b>Destino:</b> ${destino}`);

  rutasDibujadas.push(marcadorOrigen);
  rutasDibujadas.push(marcadorDestino);
}


function limpiarRutas() {
  rutasDibujadas.forEach((ruta) => {
    map.removeLayer(ruta);
  });
  rutasDibujadas = [];
}

function configurarEventosTabla() {
  const filas = document.querySelectorAll(".routes-table tbody tr");

  filas.forEach((fila) => {
    fila.style.cursor = "pointer";

    fila.addEventListener("click", function () {
      const origenLat = parseFloat(this.dataset.origenLat);
      const origenLng = parseFloat(this.dataset.origenLng);
      const destinoLat = parseFloat(this.dataset.destinoLat);
      const destinoLng = parseFloat(this.dataset.destinoLng);

      const origen = this.cells[0].textContent;
      const destino = this.cells[1].textContent;

      limpiarRutas();

      dibujarRutaUnica(
        origenLat,
        origenLng,
        destinoLat,
        destinoLng,
        origen,
        destino
      );

      // Ajustar vista para mostrar ambos puntos
      const bounds = L.latLngBounds(
        [origenLat, origenLng],
        [destinoLat, destinoLng]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    });
  });
}

function actualizarRutasFiltradas() {
  limpiarRutas();
}

// Exportar funciones para uso en otros scripts
window.actualizarRutasFiltradas = actualizarRutasFiltradas;