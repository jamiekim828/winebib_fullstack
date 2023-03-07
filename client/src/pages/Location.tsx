import React from 'react'
import Map from '../components/map/Map'

const location = {
  address: 'Stationplein, 1012AB Amsterdam',
  lat: 52.37907916043513,
  lng: 4.900234447434976,
} 

export default function Location() {
  return (
    <div><Map location={location} zoomLevel={17}/></div>
  )
}

