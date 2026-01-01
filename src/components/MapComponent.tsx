import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useLocation } from '../context/LocationContext';

// Custom Icons
const riderIcon = L.divIcon({
    className: 'custom-rider-icon',
    html: `<div class="w-8 h-8 bg-kash-green-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white text-lg">🛵</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const homeIcon = L.divIcon({
    className: 'custom-home-icon',
    html: `<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

// Component to handle Routing and View Fitting
const RoutingLayer = ({ userLoc, driverLoc }: { userLoc: [number, number], driverLoc: [number, number] }) => {
    const map = useMap();
    const [routePath, setRoutePath] = useState<[number, number][]>([]);

    useEffect(() => {
        if (!userLoc || !driverLoc) return;

        const getRoute = async () => {
            try {
                // OSRM requires coordinates in [lon, lat] format
                const start = `${driverLoc[1]},${driverLoc[0]}`;
                const end = `${userLoc[1]},${userLoc[0]}`;

                const response = await axios.get(
                    `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
                );

                if (response.data.routes && response.data.routes[0]) {
                    const coordinates = response.data.routes[0].geometry.coordinates;
                    // Convert GeoJSON [lon, lat] to Leaflet [lat, lon]
                    const latLngs = coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
                    setRoutePath(latLngs);

                    // Fit map bounds to show full route with padding for bottom sheet
                    const bounds = L.latLngBounds(latLngs);
                    map.fitBounds(bounds, {
                        paddingBottomRight: [0, 300], // Push map up to avoid bottom sheet coverage
                        paddingTopLeft: [50, 50],
                        animate: true,
                        duration: 1
                    });
                }
            } catch (error) {
                console.error("Error fetching OSRM route:", error);

                // Fallback: draw straight line if OSRM fails
                setRoutePath([driverLoc, userLoc]);
                const bounds = L.latLngBounds([driverLoc, userLoc]);
                map.fitBounds(bounds, { paddingBottomRight: [0, 300], paddingTopLeft: [50, 50] });
            }
        };

        getRoute();
    }, [userLoc, driverLoc, map]);

    return (
        <>
            {routePath.length > 0 && <Polyline positions={routePath} color="#16a34a" weight={5} opacity={0.8} />}
            <Marker position={userLoc} icon={homeIcon}>
                <Popup>Your Location</Popup>
            </Marker>
            <Marker position={driverLoc} icon={riderIcon}>
                <Popup>Rider Location</Popup>
            </Marker>
        </>
    );
};

export const MapComponent = () => {
    // Consume global location context
    const { location, isLoading } = useLocation();

    // Derived state for driver (still simulated locally for now)
    const [driverLocation, setDriverLocation] = useState<[number, number]>([34.0736, 74.7873]);

    // Simulate Rider Movement
    useEffect(() => {
        if (!location) return;

        const interval = setInterval(() => {
            setDriverLocation(prev => {
                const latDiff = location.latitude - prev[0];
                const lngDiff = location.longitude - prev[1];

                // If very close, stop moving
                if (Math.abs(latDiff) < 0.0005 && Math.abs(lngDiff) < 0.0005) return prev;

                return [
                    prev[0] + latDiff * 0.05,
                    prev[1] + lngDiff * 0.05
                ];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [location]);

    const kashmirBounds: L.LatLngBoundsExpression = [
        [33.0, 73.0],
        [35.0, 76.0]
    ];

    // Show loading state if location is not yet available
    if (isLoading || !location) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="animate-pulse text-kash-green-600 font-bold">Locating...</span>
            </div>
        );
    }

    const userCoords: [number, number] = [location.latitude, location.longitude];

    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <MapContainer
                center={userCoords}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                maxBounds={kashmirBounds}
                minZoom={10}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RoutingLayer userLoc={userCoords} driverLoc={driverLocation} />
            </MapContainer>
        </div>
    );
};

