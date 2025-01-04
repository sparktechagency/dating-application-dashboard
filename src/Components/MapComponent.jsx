import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const MapComponent = () => {
  // Initial positions for two users
  const [user1Position, setUser1Position] = useState([51.505, -0.09]);
  const [user2Position, setUser2Position] = useState([51.51, -0.1]);

  // Simulate user movement
  useEffect(() => {
    const interval = setInterval(() => {
      setUser1Position((prev) => [prev[0] + 0.001, prev[1] + 0.001]);
      setUser2Position((prev) => [prev[0] - 0.001, prev[1] - 0.001]);
    }, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      {/* Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* User 1 Marker */}
      <Marker position={user1Position}></Marker>
      {/* User 2 Marker */}
      <Marker position={user2Position}></Marker>
      {/* Line connecting users */}
      <Polyline positions={[user1Position, user2Position]} color="blue" />
    </MapContainer>
  );
};

export default MapComponent;
