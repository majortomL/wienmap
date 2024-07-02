import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

export const iconMap = {
    "Trinkwasserbrunnen": L.icon({ iconUrl: '/drop.png', iconSize: [20, 20], iconAnchor: [12, 12] }),
    "Sprühnebelduschen": L.icon({ iconUrl: '/fog.png', iconSize: [25, 25], iconAnchor: [12, 12] }),
    "Fahrradstationen": L.icon({ iconUrl: '/bike.png', iconSize: [25, 25], iconAnchor: [12, 12] }),
    "Tischtennis": L.icon({ iconUrl: '/ping-pong.png', iconSize: [25, 25], iconAnchor: [12, 12] }),
};
