import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { cellToBoundary } from 'h3-js';
import { useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const App = () => {
  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const drawH3Cells = (map) => {
    // Replace the following H3 index with your desired resolution and coordinates
    const h3Index = '8a2a1072b59ffff';

    const vertices = cellToBoundary(h3Index, true); // Get vertices of the cell
    const latLngs = vertices.map((vertex) => [vertex[0], vertex[1]]);
    L.polygon(latLngs, { color: 'red' }).addTo(map); // Add polygon to the map
  };

  useEffect(() => {
    const map = L.map('map').setView([13.441972604761181, -16.67315011169298], 15);

    L.tileLayer('https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Google Maps',
    }).addTo(map);

    drawH3Cells(map); // Call the function to draw H3 cells

    return () => {
      map.off();
      map.remove();
    };
  }, []); // Ensure this effect runs only once

  return (
    <>
      <div style={{ display: 'flex' }}>
        <MapContainer
          id="map"
          style={{
            height: '100vh',
            width: '100%',
          }}
          center={[13.441972604761181, -16.67315011169298]}
          zoom={15}
        > 
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default App;
