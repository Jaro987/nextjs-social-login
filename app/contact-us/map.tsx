'use client'

import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L, { icon } from "leaflet";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { mapTilerApiKey } from './consts';

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<L.Map | null>(null);
    const center = { lat: 45.20607430978645, lng: 19.81065396745218 };
    const [zoom] = useState(15);

    useEffect(() => {
        if (map.current) return;
        if (!mapContainer.current) {
            console.error('mapContainer is not initialized');
            return;
        }
        map.current = new L.Map(mapContainer.current, {
            center: L.latLng(center.lat, center.lng),
            zoom: zoom
        }
        );

        const mtLayer = new MaptilerLayer({
            apiKey: mapTilerApiKey,
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
        <div className={'relative w-[327px] sm:w-[600px] lg:w-[450px] h-[300px] xl:w-[600px] xl:h-[400px] place-self-center'}>
            <div ref={mapContainer} className={'absolute w-[327px] sm:w-[600px] lg:w-[450px] h-[300px] xl:w-[600px] xl:h-[400px]'} />
        </div>
    )
}

export default Map;


//https://www.youtube.com/watch?v=Rs8018RO5YQ