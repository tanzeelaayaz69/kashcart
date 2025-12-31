import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
}

interface LocationContextType {
    location: LocationData | null;
    isLoading: boolean;
    error: string | null;
    detectLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const detectLocation = async () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse geocoding using OpenStreetMap Nominatim API
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );

                    const address = response.data.display_name;
                    const addressParts = address.split(', ');
                    // Try to extract a shorter city/area name
                    const city = addressParts[0] + ', ' + (addressParts[1] || addressParts[2] || '');

                    setLocation({
                        latitude,
                        longitude,
                        address,
                        city,
                    });
                } catch (err) {
                    console.error("Error fetching address:", err);
                    // Fallback if reverse geocoding fails
                    setLocation({
                        latitude,
                        longitude,
                        address: 'Unknown Location',
                        city: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                    });
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                console.warn("Location permission denied or error:", err);
                setError('Location permission denied');
                // Set default location (Srinagar)
                setLocation({
                    latitude: 34.0836,
                    longitude: 74.7973,
                    address: 'Lal Chowk, Srinagar, Jammu and Kashmir',
                    city: 'Lal Chowk, Srinagar'
                });
                setIsLoading(false);
            }
        );
    };

    useEffect(() => {
        detectLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, isLoading, error, detectLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
