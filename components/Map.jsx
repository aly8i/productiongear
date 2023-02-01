import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "../styles/Map.module.css";
const Map = ({lat,lng,setLat,setLng})=>{
  const MAPBOX_APIKEY = `${process.env.NEXT_PUBLIC_MAPBOX_APIKEY}`;
  mapboxgl.accessToken = MAPBOX_APIKEY;
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const map = useRef(null);
  const [userLng, setUserLng] = useState(lat);
  const [userLat, setUserLat] = useState(lng);
  const [zoom, setZoom] = useState(5);
  
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    };
    function success(pos) {
      setUserLng(pos.coords.longitude);
      setUserLat(pos.coords.latitude);
      map.current.flyTo({center:[pos.coords.longitude, pos.coords.latitude],zoom:15});
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success,error,options);
  },[userLat,userLng]);
  
  useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
      if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      marker.current = new mapboxgl.Marker().setLngLat([-70.9, 42.35]);
   });
    return (
        <div className={styles.mapWrapper}>
            <div ref={mapContainer} className={styles.mapContainer}>
                <div ref={marker} className={styles.marker}></div>
            </div>
        </div> 
    )
}

export default Map