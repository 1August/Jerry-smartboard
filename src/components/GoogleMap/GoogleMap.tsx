import GoogleMapReact from 'google-map-react'
import { cn } from '@/lib/utils.ts'
import { useLocalStorage } from '@/hooks/useLocalStorage.ts'
import { useState } from 'react'

export type MarkerProps = {
  lat: number
  lng: number
  text: string
}
const Marker = (props: MarkerProps) => {
  const { lat, lng, text } = props
  return (
    <div className={cn('text-white bg-red-500 rounded-full w-6 h-6 border-4')}>
      {text}
    </div>
  )
}

export const GoogleMap = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 51.088749,
    lng: 71.419069,
  })
  const [locationStorage] = useLocalStorage('location', { lng: 42, lat: 60 })

  const defaultProps = {
    center: {
      lat: locationStorage.lat,
      lng: locationStorage.lng,
    },
    zoom: 15,
  }

  // const handleMapChange = (newMapProps: GoogleMapReact.ChangeEventValue) => {
  //   console.log(markerPosition)
  //   console.log(newMapProps.center)
  //
  //   // setMarkerPosition((prev) => ({
  //   //   lat: prev.lat + newMapProps.marginBounds.nw.lat,
  //   //   lng: prev.lng + newMapProps.marginBounds.nw.lng,
  //   // }))
  // }

  const handleApiLoaded = ({ map, maps }) => {
    // console.log(map)
  }

  return (
    <div className={cn('w-full h-full')}>
      <GoogleMapReact
        options={{
          clickableIcons: true,
          streetViewControl: true,
          mapTypeControl: true,
        }}
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={handleApiLoaded}
      >
        {/*<Marker*/}
        {/*  lat={markerPosition.lat}*/}
        {/*  lng={markerPosition.lng}*/}
        {/*  text={'Marker'}*/}
        {/*/>*/}
      </GoogleMapReact>
    </div>
  )
}
