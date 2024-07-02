import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CustomControl = ({ onClick }) => {
    const map = useMap();
    const [currentTileUrl, setCurrentTileUrl] = useState("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png");
    const tileUrls = [
        "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", // Light mode
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" // Dark mode
    ];

    const switchTileUrl = () => {
        setCurrentTileUrl(prev => {
            const newIndex = tileUrls.indexOf(prev) === 0 ? 1 : 0;
            const newUrl = tileUrls[newIndex];
            map.eachLayer(layer => {
                if (layer instanceof L.TileLayer) {
                    layer.setUrl(newUrl);
                }
            });
            onClick(newUrl); // Notify parent about the URL change
            return newUrl;
        });
    };

    useEffect(() => {
        const customControl = L.Control.extend({
            options: { position: 'topleft' },
            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.style.cssText = `
                    background-color: white;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    background-image: url(/moon.png);
                    background-size: cover;
                    background-position: center;
                `;
                container.onclick = switchTileUrl;
                return container;
            }
        });

        const control = new customControl();
        map.addControl(control);

        return () => map.removeControl(control);
    }, [map]);

    return null;
};

export default CustomControl;
