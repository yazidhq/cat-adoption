import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapLeaf({ location }) {
  const defaultPosition = [-6.24573, 106.991];

  let position;

  if (location) {
    const coords = location
      .split(", ")
      .slice(-2)
      .join(", ")
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      position = coords;
    } else {
      console.error(
        "Invalid location format. Falling back to default position."
      );
      position = defaultPosition;
    }
  } else {
    console.error("Location is null. Falling back to default position.");
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
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Lokasi: {location || "Default Location"}</Popup>
      </Marker>
    </MapContainer>
  );
}
