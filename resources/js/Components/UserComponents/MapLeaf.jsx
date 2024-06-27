import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Mengatasi masalah ikon marker
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapLeaf({ lat, long }) {
  const defaultPosition = [-6.24573, 106.991];

  let position;

  if (lat !== undefined && long !== undefined) {
    position = [lat, long];
  } else {
    console.error(
      "Koordinat lokasi tidak tersedia. Kembali ke posisi default."
    );
    position = defaultPosition;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "250px", width: "100%" }}
      className="rounded-4"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Lokasi: {`${lat}, ${long}` || "Lokasi Default"}</Popup>
      </Marker>
    </MapContainer>
  );
}
