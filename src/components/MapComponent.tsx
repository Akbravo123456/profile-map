import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
  lat: number;
  lng: number;
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRoYXJ2YS0zMjEiLCJhIjoiY20wZm8ybWt3MGNwZzJucjFjczJkMXJmNCJ9.BZd6u-Gk85vkI5r8w1wxjQ';

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return () => map.remove(); 
  }, [lat, lng]);

  return <div ref={mapContainerRef} className="w-full h-64 rounded-lg shadow-md mt-4" />;
};

export default MapComponent;
