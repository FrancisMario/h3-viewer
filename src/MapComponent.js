import React, { useEffect } from 'react';
import * as h3 from 'h3-js';

const MapComponent = () => {

  const latitude = 13.441972604761181;
  const longitude = -16.67315011169298;
  const zoomLevel = 15;

  useEffect(() => {
    // Function to draw H3 hexagons
    const drawHexagons = (map) => {
      const hexagons = h3.splitLongToH3Index(h3.geoToH3(latitude, longitude, zoomLevel), 5); // Adjust the radius as needed

      hexagons.forEach((hex) => {
        const vertices = h3.h3ToGeoBoundary(hex);
        const latLngs = vertices.map((vertex) => [vertex[0], vertex[1]]);
        L.polygon(latLngs, { color: 'blue' }).addTo(map);
      });
    };

    // Create Leaflet map
    const map = L.map('your-map-id').setView([latitude, longitude], zoomLevel);

    // Add the Google Maps layer
    L.tileLayer('https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google'
    }).addTo(map);

    // Draw H3 hexagons
    drawHexagons(map);
  }, []); // Make sure to adjust the dependencies as needed

  return (
    <div id="your-map-id" style={{ height: '400px', width: '100%' }}>
    </div>
  );
};

export default MapComponent;
