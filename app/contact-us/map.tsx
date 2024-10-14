'use client'

import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L, { icon } from "leaflet";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<L.Map | null>(null);
    const center = { lat: 45.251087283215476, lng: 19.77080071231874 };
    const [zoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
        if (!mapContainer.current) {
            console.error('mapContainer is not initialized');
            return;
        }
        map.current = new L.Map(mapContainer.current, {
            center: L.latLng(center.lat, center.lng),
            zoom: zoom
        }
        );

        // Create a MapTiler Layer inside Leaflet
        const mtLayer = new MaptilerLayer({
            // Get your free API key at https://cloud.maptiler.com
            apiKey: "c3MXxkl0XvVEPjXDfnNI",
        });
        mtLayer.addTo(map.current);
        L.marker(L.latLng(center.lat, center.lng),
            {
                icon: icon({
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    iconUrl: 'https://img.icons8.com/?size=100&id=BE8zKVHfRaQj&format=png&color=000000',
                }),
            }
        ).addTo(map.current);

    }, [center.lng, center.lat, zoom]);

    return (
        <div className={'relative w-[450px] xl:w-[600px] h-[300px] xl:h-[400px]'}>
            <div ref={mapContainer} className={'absolute w-[450px] xl:w-[600px] h-[300px] xl:h-[400px]'} />
        </div>
    )
}

export default Map;