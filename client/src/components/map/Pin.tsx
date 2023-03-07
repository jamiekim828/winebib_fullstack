import React from 'react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

type Prop = {
    lat: number;
    lng: number;
    text: string;
}

export default function Pin({lat, lng, text}:Prop) {
  return (
    <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
  )
}
