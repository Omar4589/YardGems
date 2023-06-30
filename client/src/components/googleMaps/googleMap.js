import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import './google.css'
import { LiaGemSolid } from 'react-icons/lia';
// import styles from './styles'

export default function GoogleMaps() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyD0wHPHkv4tLhoUD4k68TmSVqSdrciUR1k'
        // Solution: if i want to protect the key, create server side endpoint (graphql resolver) that iwll return the key and make sure the resolver only shows up if they're logged in. 
    });
    if(!isLoaded) return <div>Loading...</div>
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({lat:29.424349, lng: -98.491142}), []);


return (
    <GoogleMap 
    zoom={10} 
    center={center} 
    mapContainerClassName="map-container" 
    options={{mapId: 'b347f09b91c16629'}}
    >
        <MarkerF key='1' position={center} icon={ LiaGemSolid }
        />
    </GoogleMap>
);
}
