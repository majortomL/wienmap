import React, {useState, useEffect, useRef} from 'react';
import './ExpandableMenuControl.css';

const apiLinks = {
    "Trinkwasserbrunnen": "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json",
    "Sprühnebelduschen": "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json",
    "Fahrradstationen": "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:RADSERVICEOGD&srsName=EPSG:4326&outputFormat=json",
    "Tischtennis": "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPORTSTAETTENOGD&srsName=EPSG:4326&outputFormat=json"
};

const ExpandableMenuControl = ({onOptionSelect, onIconChange, iconMap}) => {
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => setIsVisible(prev => !prev);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        const selectedIcon = iconMap[selectedOption];
        if (selectedOption && selectedIcon) {
            fetch(apiLinks[selectedOption])
                .then(response => response.json())
                .then(data => {
                    let textProperty;
                    console.log(data)

                    switch (selectedOption) {
                        case 'Trinkwasserbrunnen':
                            textProperty = 'BASIS_TYP_TXT';
                            data.features = data.features.filter(feature => feature.properties[textProperty].includes("Trink"));
                            break;
                        case 'Sprühnebelduschen':
                            textProperty = 'BASIS_TYP_TXT';
                            data.features = data.features.filter(feature => feature.properties[textProperty].includes("Sprühnebel"));
                            break;
                        case 'Fahrradstationen':
                            textProperty = 'BEZEICHNUNG';
                            break;
                        case 'Tischtennis':
                            textProperty = 'SPORTSTAETTEN_ART'
                            data.features = data.features.filter(feature => feature.properties[textProperty].includes("Tischtennis"));
                            break;
                        default:
                            textProperty = 'BASIS_TYP_TXT';
                    }

                    const markers = data.features.map(feature => ({
                        position: feature.geometry.coordinates.reverse(),
                        text: feature.properties[textProperty] || 'No Name'
                    }));


                    onOptionSelect(markers, selectedIcon);
                    onIconChange(selectedIcon);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    };

    return (
        <>
            <div className="menu-bar">
                <button className="menu-button" onClick={toggleMenu} ref={buttonRef}>
                    <img src="/filter.png" alt="Menu"/>
                    Filter
                </button>
            </div>
            <div className={`menu ${isVisible ? 'visible' : 'hidden'}`} ref={menuRef}>
                <ul>
                    {Object.keys(iconMap).map((option, index) => (
                        <li key={index}>
                            <label>
                                <input type="radio" name="options" value={option} onChange={handleOptionChange}/>
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ExpandableMenuControl;
