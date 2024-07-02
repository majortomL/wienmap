import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationButton = () => {
    const map = useMap();
    const [userPosition, setUserPosition] = useState(null);
    const [watchId, setWatchId] = useState(null); // State to store watch ID
    const [centered, setCentered] = useState(false); // Track if map is centered

    const handleLocation = (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);

        // Add or update the marker
        if (!map.userMarker) {
            const userMarker = L.marker([latitude, longitude], {
                icon: L.icon({
                    iconUrl: '/target.png', // Path to your icon
                    iconSize: [25, 25],
                    iconAnchor: [12, 25]
                }),
                interactive: false // Disable interactivity
            }).addTo(map);
            map.userMarker = userMarker;
        } else {
            map.userMarker.setLatLng([latitude, longitude]);
        }
    };

    const handleError = (error) => {
        console.error('Error getting location:', error);
    };

    const handleClick = () => {
        if (navigator.geolocation) {
            // Stop previous tracking if it's active
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
            // Start tracking user's location
            const id = navigator.geolocation.watchPosition(handleLocation, handleError, {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            });
            setWatchId(id); // Store the watch ID

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    if (!centered) {
                        map.setView([latitude, longitude], 13); // Adjust zoom level as needed
                        setCentered(true); // Set flag to prevent re-centering
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        const locationControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.style.backgroundColor = 'white';
                container.style.width = '20px';
                container.style.height = '20px';
                container.style.cursor = 'pointer';
                container.style.backgroundImage = 'url(/navigation.png)'; // Path to your icon
                container.style.backgroundSize = 'cover';
                container.style.backgroundPosition = 'center';
                container.onclick = handleClick;

                return container;
            }
        });

        const control = new locationControl();
        map.addControl(control);

        return () => {
            map.removeControl(control);
            if (watchId) {
                navigator.geolocation.clearWatch(watchId); // Clean up on component unmount
            }
        };
    }, [map, centered, watchId]); // Include watchId in dependency array

    return null;
};

export default LocationButton;
