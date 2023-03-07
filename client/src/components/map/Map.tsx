import React from 'react'
import GoogleMapReact from 'google-map-react'
import env from "react-dotenv";

import Pin from './Pin'

type Prop = {
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    zoomLevel: number;
}

export default function Map({ location, zoomLevel } : Prop) {
    const API_KEY = process.env.REACT_APP_API_KEY as string;
  return (
    <div className="map">
    <h2 className="map-h2">Come Visit WineBieb.</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY}}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <Pin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
  )
}
