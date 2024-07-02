import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomControl from './CustomControl';
import LocationButton from './LocationButton';

function FullScreenMap({ tileUrl, onTileUrlChange, markers, icon }) {
    return (
        <div className="map-container">
            <MapContainer center={[48.20860652701826, 16.37298742951384]} zoom={13} style={{ height: "90vh", width: "100vw", marginTop: "10vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                    url={tileUrl}
                    maxZoom={20}
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={icon}>
                        <Popup>
                            <span dangerouslySetInnerHTML={{ __html: marker.text }} />
                        </Popup>
                    </Marker>
                ))}
                <CustomControl position="topright" onClick={onTileUrlChange} />
                <LocationButton /> {/* Add the LocationButton component here */}
            </MapContainer>
        </div>
    );
}

export default FullScreenMap;
