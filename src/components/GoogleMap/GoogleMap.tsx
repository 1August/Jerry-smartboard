import GoogleMapReact from 'google-map-react'
import { cn } from '@/lib/utils.ts'
import { useLocalStorage } from '@/hooks/useLocalStorage.ts'

export const GoogleMap = () => {
  const [locationStorage] = useLocalStorage('location', { lng: 42, lat: 60 })

  const defaultProps = {
    center: {
      lat: locationStorage.lat,
      lng: locationStorage.lng,
    },
    zoom: 15,
  }

  const handleApiLoaded = () => {}

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
