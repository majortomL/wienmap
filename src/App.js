import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import CustomControl from './CustomControl';
import ExpandableMenuControl from './ExpandableMenuControl';
import {DefaultIcon, iconMap} from './icons';
import FullScreenMap from './FullScreenMap'

L.Marker.prototype.options.icon = DefaultIcon;

const App = () => {
    const [tileUrl, setTileUrl] = useState("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png");
    const [markers, setMarkers] = useState([]);
    const [currentIcon, setCurrentIcon] = useState(DefaultIcon);

    const handleTileUrlChange = (newUrl) => setTileUrl(newUrl);

    const handleOptionSelect = (newMarkers, selectedIcon) => {
        setMarkers(newMarkers);
        setCurrentIcon(selectedIcon);
    };

    return (
        <div className="App">
            <FullScreenMap
                tileUrl={tileUrl}
                onTileUrlChange={handleTileUrlChange}
                markers={markers}
                icon={currentIcon}
            />
            <ExpandableMenuControl
                onOptionSelect={handleOptionSelect}
                onIconChange={setCurrentIcon}
                iconMap={iconMap}
            />
        </div>
    );
};

// const FullScreenMap = ({tileUrl, onTileUrlChange, markers, icon}) => (
//     <div className="map-container">
//         <MapContainer center={[48.20860652701826, 16.37298742951384]} zoom={13}
//                       style={{height: "90vh", width: "100vw", marginTop: "10vh"}}>
//             <TileLayer
//                 attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
//                 url={tileUrl}
//                 maxZoom={20}
//             />
//             {markers.map((marker, index) => (
//                 <Marker key={index} position={marker.position} icon={icon}>
//                     <Popup>
//                         <span dangerouslySetInnerHTML={{__html: marker.text}}/>
//                     </Popup>
//                 </Marker>
//             ))}
//             <CustomControl position="topright" onClick={onTileUrlChange}/>
//         </MapContainer>
//     </div>
// );

export default App;
